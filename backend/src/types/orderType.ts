import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
  product: mongoose.Types.ObjectId;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
  customerType: "guest" | "user";
}
