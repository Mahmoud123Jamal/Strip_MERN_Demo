import { Document } from "mongoose";

export interface Iproduct extends Document {
  name: string;
  image: string;
  price: number;
  stock: number;
  reserved: number;
  lockExpiresAt: Date | null;
}
