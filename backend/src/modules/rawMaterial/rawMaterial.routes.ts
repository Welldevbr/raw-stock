import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import {
  createRawMaterialSchema,
  updateRawMaterialSchema,
} from "./rawMaterial.validation";
import { rawMaterialController } from "./rawMaterial.controller";

const router = Router();

router.post(
  "/",
  validate(createRawMaterialSchema),
  rawMaterialController.create,
);
router.get("/", rawMaterialController.getAll);
router.put(
  "/:id",
  validate(updateRawMaterialSchema),
  rawMaterialController.update,
);
router.delete("/:id", rawMaterialController.delete);

export const rawMaterialRoutes = router;
