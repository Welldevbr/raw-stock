import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import {
  CreateProductRawMaterialSchema,
  UpdateProductRawMaterialSchema,
} from "./productRawMaterial.validation";
import { productRawMaterialController } from "./productRawMaterial.controller";

const router = Router();

router.post(
  "/",
  validate(CreateProductRawMaterialSchema),
  productRawMaterialController.create,
);
router.get("/", productRawMaterialController.findAll);
router.put(
  "/:id",
  validate(UpdateProductRawMaterialSchema),
  productRawMaterialController.update,
);
router.delete("/:id", productRawMaterialController.delete);

export const productRawMaterialRoutes = router;
