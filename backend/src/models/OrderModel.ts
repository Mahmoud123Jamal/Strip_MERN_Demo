import mongoose from "mongoose";
import { IOrder } from "../types/orderType";

const orderSchema = new mongoose.Schema<IOrder>({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  paymentIntentId: {
    type: String,
    unique: true,
  },
  amount: Number,
  currency: String,
  status: String,
  customerType: {
    type: String,
    enum: ["guest", "user"],
    default: "guest",
  },
});

export const OrderModel = mongoose.model("Order", orderSchema);
