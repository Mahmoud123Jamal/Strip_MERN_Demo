import { model, Schema } from "mongoose";
import { Iproduct } from "./../types/productType";

const productSchem = new Schema<Iproduct>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
});
const Product = model<Iproduct>("Product", productSchem);
export default Product;
