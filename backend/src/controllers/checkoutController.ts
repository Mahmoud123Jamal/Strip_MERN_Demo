import mongoose from "mongoose";
import { Request, Response } from "express";
import Stripe from "stripe";
import Product from "../models/product";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const checkoutController = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { productId } = req.body;

    const product = await Product.findOneAndUpdate(
      {
        _id: productId,
        stock: { $gt: 0 },
      },
      {
        $inc: { stock: -1, reserved: 1 },
        $set: { lockExpiresAt: new Date(Date.now() + 10 * 60 * 1000) }, // 10 min
      },
      { new: true, session }
    );

    if (!product) {
      throw new Error("OUT_OF_STOCK");
    }

    // CREATE STRIPE SESSION
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      expires_at: Math.floor(Date.now() / 1000) + 31 * 60,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(product.price * 100),
            product_data: {
              name: product.name,
              images: [product.image],
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        productId: product._id.toString(),
      },
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    await session.commitTransaction();
    res.json({ url: stripeSession.url });
  } catch (error: any) {
    await session.abortTransaction();
    const status = error.message === "OUT_OF_STOCK" ? 400 : 500;
    res.status(status).json({
      message:
        error.message === "OUT_OF_STOCK"
          ? "This item is currently unavailable"
          : "Checkout failed",
    });
  } finally {
    session.endSession();
  }
};
