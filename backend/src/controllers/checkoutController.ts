import { Request, Response } from "express";
import Stripe from "stripe";
import Product from "../models/product";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
if (!stripe) {
  throw new Error(
    "Stripe initialization failed. Check your STRIPE_SECRET_KEY."
  );
}
export const checkoutController = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const clientSide = process.env.CLIENT_URL || "http://localhost:5000";
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name as string,
              images: [product.image as string],
            },
            unit_amount: Math.round(product.price * 100), // استخدام Math.round لضمان رقم صحيح
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata: {
          productId: product._id.toString(),
        },
      },
      mode: "payment",
      success_url: `${clientSide}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientSide}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({
      status: "error",
      message: "Payment session creation failed",
    });
  }
};
