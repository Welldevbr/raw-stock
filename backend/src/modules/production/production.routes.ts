import { Router } from "express";
import { ProductionController } from "./production.controller";

const router = Router();
const controller = new ProductionController();

router.get("/", controller.simulate);

export { router as productionRoutes };
