import { Request, Response } from "express";
import Product from "../models/product";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, image, price } = req.body;
    const product = await Product.create({ name, image, price });
    res.status(200).json({ status: "success", data: { product } });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error in product controller",
    });
  }
};

export const allProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json({ status: "success", data: { products } });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error in product controller",
    });
  }
};
