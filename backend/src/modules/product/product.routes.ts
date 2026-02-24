import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import { createProductSchema, updateProductSchema } from "./product.validation";
import { productController } from "./product.controller";

const router = Router();

router.post("/", validate(createProductSchema), productController.create);
router.get("/", productController.getAll);
router.put("/:id", validate(updateProductSchema), productController.update);
router.delete("/:id", productController.delete);

export const productRoutes = router;
