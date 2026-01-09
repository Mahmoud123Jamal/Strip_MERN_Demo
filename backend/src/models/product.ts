import { model, Schema } from "mongoose";
import { Iproduct } from "../types/productType";

const productSchema = new Schema<Iproduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true, min: 0, default: 0 },
  reserved: { type: Number, default: 0, min: 0 },
  lockExpiresAt: { type: Date, default: null },
});

const Product = model<Iproduct>("Product", productSchema);
export default Product;
