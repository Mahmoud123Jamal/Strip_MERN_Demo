import { allProducts, createProduct } from "../controllers/productController";
import { Router } from "express";
const router = Router();
router.post("/create-products", createProduct);
router.get("/products", allProducts);

export default router;
