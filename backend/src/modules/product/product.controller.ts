import { Request, RequestHandler, Response } from "express";
import { productService } from "./product.services";

export const productController = {
  async create(req: Request, res: Response) {
    const product = await productService.create(req.body);
    return res.status(201).json(product);
  },
  async getAll(req: Request, res: Response) {
    const products = await productService.getAll();
    return res.json(products);
  },
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const product = await productService.update(Number(id), req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product);
  },
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const product = await productService.delete(Number(id));

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(204).json({ message: "Product deleted successfully" });
  },
};
