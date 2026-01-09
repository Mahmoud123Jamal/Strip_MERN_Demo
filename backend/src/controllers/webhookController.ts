import { Request, Response } from "express";
import Stripe from "stripe";
import Order from "../models/OrderModel";
import Product from "../models/product";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const stripeWebhookController = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.payment_status !== "paid") break;

        const productId = session.metadata?.productId;
        const paymentIntentId = session.payment_intent as string;

        if (!productId || !paymentIntentId) break;

        // Idempotency
        const exists = await Order.findOne({ paymentIntentId });
        if (exists) break;

        //Create Order
        await Order.create({
          product: productId,
          paymentIntentId,
          amount: (session.amount_total ?? 0) / 100,
          currency: session.currency ?? "usd",
          status: "paid",
        });

        //Finalize stock
        await Product.findByIdAndUpdate(productId, {
          $inc: { reserved: -1 },
          $unset: { lockExpiresAt: "" },
        });

        console.log("Order completed:", paymentIntentId);
        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        const productId = session.metadata?.productId;

        if (!productId) break;

        await Product.findByIdAndUpdate(productId, {
          $inc: { stock: 1, reserved: -1 },
          $unset: { lockExpiresAt: "" },
        });

        console.log("Checkout expired, stock restored");
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error: any) {
    console.error("Webhook handler error:", error.message);
  }

  res.json({ received: true });
};
