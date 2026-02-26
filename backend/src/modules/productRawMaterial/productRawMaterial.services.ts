import { prisma } from "../../database/prisma";
import { CreateProductRawMaterialDto } from "./dto/create-product-raw-material.dto";
import { UpdateProductRawMaterialDto } from "./dto/update-product-raw-material.dto";

export const productRawMaterialService = {
  async create(data: CreateProductRawMaterialDto) {
    const product = await prisma.product.findUnique({
      where: { id: data.productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const rawMaterial = await prisma.rawMaterial.findUnique({
      where: { id: data.rawMaterialId },
    });

    if (!rawMaterial) {
      throw new Error("Raw material not found");
    }

    return prisma.productRawMaterial.create({
      data,
    });
  },
  async findAll() {
    return prisma.productRawMaterial.findMany({
      include: {
        product: true,
        rawMaterial: true,
      },
    });
  },
  async update(id: number, data: UpdateProductRawMaterialDto) {
    const productRawMaterial = await prisma.productRawMaterial.findUnique({
      where: { id },
    });

    if (!productRawMaterial) {
      throw new Error("Product raw material not found");
    }

    return prisma.productRawMaterial.update({
      where: { id },
      data,
    });
  },
  async delete(id: number) {
    const productRawMaterial = await prisma.productRawMaterial.findUnique({
      where: { id },
    });

    if (!productRawMaterial) {
      throw new Error("Product raw material not found");
    }

    return prisma.productRawMaterial.delete({
      where: { id },
    });
  },
};
