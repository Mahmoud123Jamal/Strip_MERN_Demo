import { Schema, model } from "mongoose";
import { IOrder } from "../types/orderType";

const orderSchema = new Schema<IOrder>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    paymentIntentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      sparse: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      required: true,
      lowercase: true,
      default: "usd",
    },

    status: {
      type: String,
      enum: ["pending", "paid", "cancelled", "expired"],
      default: "paid",
    },
  },
  { timestamps: true }
);

const Order = model<IOrder>("Order", orderSchema);
export default Order;
