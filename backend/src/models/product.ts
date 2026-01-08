import { model, Schema } from "mongoose";
import { Iproduct } from "../types/productType";

const productSchema = new Schema<Iproduct>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },

  stock: {
    type: Number,
    required: true,
    default: 0,
  },

  lockedStock: {
    type: Number,
    default: 0,
  },
});

const Product = model<Iproduct>("Product", productSchema);
export default Product;
