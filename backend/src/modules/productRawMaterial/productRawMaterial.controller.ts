import { Request, Response } from "express";
import { productRawMaterialService } from "./productRawMaterial.services";

export const productRawMaterialController = {
  async create(req: Request, res: Response) {
    const relation = await productRawMaterialService.create(req.body);
    return res.status(201).json({
      relation,
      message: "Product raw material relation created successfully",
    });
  },
  async findAll(req: Request, res: Response) {
    const relations = await productRawMaterialService.findAll();
    return res.status(200).json(relations);
  },
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const relation = await productRawMaterialService.update(
      Number(id),
      req.body,
    );
    return res.status(200).json({
      relation,
      message: "Product raw material relation updated successfully",
    });
  },
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await productRawMaterialService.delete(Number(id));
    return res
      .status(200)
      .json({ message: "Product raw material relation deleted successfully" });
  },
};
