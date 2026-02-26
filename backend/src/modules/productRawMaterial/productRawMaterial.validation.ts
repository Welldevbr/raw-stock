import z from "zod";

export const CreateProductRawMaterialSchema = z.object({
  productId: z.int().positive(),
  rawMaterialId: z.int().positive(),
  requiredQuantity: z.int().positive(),
});

export const UpdateProductRawMaterialSchema = z.object({
  requiredQuantity: z.int().positive(),
});
