import { Request, Response } from "express";
import Stripe from "stripe";
import { OrderModel } from "../models/OrderModel";
import Product from "../models/product";
import mongoose from "mongoose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const stripeWebhookController = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const intent = event.data.object as Stripe.PaymentIntent;
        const { productId } = intent.metadata;

        // Idempotency
        const exists = await OrderModel.findOne({
          paymentIntentId: intent.id,
        });
        if (exists) break;

        await OrderModel.create({
          product: new mongoose.Types.ObjectId(productId),
          paymentIntentId: intent.id,
          amount: intent.amount_received / 100,
          currency: intent.currency,
          status: "paid",
          customerType: "guest",
        });

        const product = await Product.findById(productId);
        if (product) {
          product.stock -= 1;
          product.lockedStock = Math.max(0, product.lockedStock - 1);
          product.lockExpiresAt = undefined;

          await product.save();
        }

        console.log(" Guest order created");
        break;
      }

      case "payment_intent.payment_failed": {
        const intent = event.data.object as Stripe.PaymentIntent;
        const productId = intent.metadata.productId;

        const product = await Product.findById(productId);
        if (product) {
          product.lockedStock = Math.max(0, product.lockedStock - 1);
          product.lockExpiresAt = undefined;
          await product.save();
        }

        console.log(" Payment failed:", intent.id);
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
  }

  res.json({ received: true });
};
