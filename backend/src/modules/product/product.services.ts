import { prisma } from "../../database/prisma";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

export const productService = {
  async create(data: CreateProductDto) {
    const product = await prisma.product.create({
      data,
    });

    return product;
  },
  async getAll() {
    const products = await prisma.product.findMany();

    return products;
  },
  async update(id: number, data: UpdateProductDto) {
    const product = await prisma.product.update({
      where: { id },
      data,
    });

    return product;
  },
  async delete(id: number) {
    return prisma.product.delete({
      where: { id },
    });
  },
};
