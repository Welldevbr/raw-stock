import { id } from "zod/v4/locales";
import { prisma } from "../../database/prisma";
import { CreateRawMaterialDto } from "./dto/create-raw-material.dto";
import { UpdateRawMaterialDto } from "./dto/update-raw-material.dto";

export const rawMaterialService = {
  async create(data: CreateRawMaterialDto) {
    const rawMaterial = await prisma.rawMaterial.create({
      data,
    });

    return rawMaterial;
  },
  async getAll() {
    const rawMaterials = await prisma.rawMaterial.findMany();

    return rawMaterials;
  },
  async update(id: number, data: UpdateRawMaterialDto) {
    const rawMaterial = await prisma.rawMaterial.update({
      where: { id },
      data,
    });

    return rawMaterial;
  },
  async delete(id: number) {
    return prisma.rawMaterial.delete({
      where: { id },
    });
  },
};
