import { Router } from "express";
import { productRoutes } from "./modules/product/product.routes";
import { rawMaterialRoutes } from "./modules/rawMaterial/rawMaterial.routes";

const router = Router();

router.use("/products", productRoutes);
router.use("/raw-materials", rawMaterialRoutes);

export { router };
