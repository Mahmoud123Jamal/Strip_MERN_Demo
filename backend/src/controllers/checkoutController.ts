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

    if (product.stock - product.lockedStock <= 0) {
      return res.status(400).json({ message: "Out of stock" });
    }

    product.lockedStock += 1;
    product.lockExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min lock

    await product.save();

    const clientUrl: string =
      (process.env.CLIENT_URL as string) ?? "http://localhost:5000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              images: [product.image],
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata: {
          productId: product._id.toString(),
          orderType: "guest",
        },
      },
      success_url: `${clientUrl}/success`,
      cancel_url: `${clientUrl}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Checkout failed" });
  }
};
