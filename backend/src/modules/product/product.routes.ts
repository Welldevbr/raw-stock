import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import { createProductSchema, updateProductSchema } from "./product.validation";
import { productController } from "./product.controller";

const router = Router();

router.post(
  "/products",
  validate(createProductSchema),
  productController.create,
);
router.get("/products", productController.getAll);
router.put(
  "/products/:id",
  validate(updateProductSchema),
  productController.update,
);
router.delete("/products/:id", productController.delete);

export { router };
