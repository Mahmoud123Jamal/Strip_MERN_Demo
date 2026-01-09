import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
  product: mongoose.Types.ObjectId;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: "pending" | "paid" | "cancelled" | "expired";
  createdAt?: Date;
  updatedAt?: Date;
}
