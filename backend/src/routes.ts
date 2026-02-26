import { Router } from "express";
import { productRoutes } from "./modules/product/product.routes";
import { rawMaterialRoutes } from "./modules/rawMaterial/rawMaterial.routes";
import { productRawMaterialRoutes } from "./modules/productRawMaterial/productRawMaterial.routes";

const router = Router();

router.use("/products", productRoutes);
router.use("/raw-materials", rawMaterialRoutes);
router.use("/product-raw-materials", productRawMaterialRoutes);

export { router };
