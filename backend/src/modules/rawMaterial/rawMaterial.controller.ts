import { Request, RequestHandler, Response } from "express";
import { rawMaterialService } from "./rawMaterial.services";

export const rawMaterialController = {
  async create(req: Request, res: Response) {
    const rawMaterial = await rawMaterialService.create(req.body);
    return res.status(201).json(rawMaterial);
  },
  async getAll(req: Request, res: Response) {
    const rawMaterials = await rawMaterialService.getAll();
    return res.json(rawMaterials);
  },
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const rawMaterial = await rawMaterialService.update(Number(id), req.body);

    if (!rawMaterial) {
      return res.status(404).json({ message: "Raw material not found" });
    }

    return res.json(rawMaterial);
  },
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const rawMaterial = await rawMaterialService.delete(Number(id));

    if (!rawMaterial) {
      return res.status(404).json({ message: "Raw material not found" });
    }

    return res
      .status(204)
      .json({ message: "Raw material deleted successfully" });
  },
};
