import z from "zod";

export const createRawMaterialSchema = z.object({
  code: z.number().min(1),
  name: z.string().min(1),
  stockQuantity: z.number().int().nonnegative(),
});

export const updateRawMaterialSchema = z.object({
  name: z.string().min(1).optional(),
  stockQuantity: z.number().int().nonnegative().optional(),
});
