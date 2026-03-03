import { Request, Response } from "express";
import { ProductionService } from "./production.services";

export class ProductionController {
  private service = new ProductionService();

  simulate = async (req: Request, res: Response) => {
    const result = await this.service.simulateProduction();
    return res.json(result);
  };
}
