import { Document } from "mongoose";

export interface Iproduct extends Document {
  name: string;
  image: String;
  price: number;
}
