import { prisma } from "../../database/prisma";
import { ProductionResponseDto } from "./dto/production-response.dto";
import { ProductionResult } from "./interfaces/production-result.interface";

export class ProductionService {
  private async getProducts() {
    return await prisma.product.findMany({
      orderBy: { price: "desc" },
      include: {
        rawMaterials: {
          include: {
            rawMaterial: true,
          },
        },
      },
    });
  }
  private buildStockSnapshot(products: any[]): Map<number, number> {
    const stockMap = new Map<number, number>();

    for (const product of products) {
      for (const rm of product.rawMaterials) {
        const rmId = rm.rawMaterialId;
        const rmStock = rm.rawMaterial.stock;

        if (!stockMap.has(rmId)) {
          stockMap.set(rmId, rmStock);
        }
      }
    }

    return stockMap;
  }
  private calculateProduction(
    products: any[],
    stockMap: Map<number, number>,
  ): { items: ProductionResult[]; totalProductionValue: number } {
    const items: ProductionResult[] = [];
    let totalProductionValue = 0;

    for (const product of products) {
      const compositions = product.rawMaterials;

      if (!compositions || compositions.length === 0) {
        continue;
      }

      const possibleUnits = compositions.map((comp: any) => {
        if (comp.stockQuantity <= 0) {
          throw new Error(
            `Invalid raw material quantity for product ${product.id}`,
          );
        }

        const availableStock = stockMap.get(comp.rawMaterialId) || 0;
        return Math.floor(availableStock / comp.stockQuantity);
      });

      const producibleQuantity = Math.min(...possibleUnits);

      if (producibleQuantity <= 0) continue;

      for (const comp of compositions) {
        const current = stockMap.get(comp.rawMaterial.id) ?? 0;

        const updated = current - comp.quantity * producibleQuantity;

        stockMap.set(comp.rawMaterial.id, updated);
      }

      const unitPrice = Number(product.price);
      const totalValue = producibleQuantity * unitPrice;

      totalProductionValue += totalValue;

      items.push({
        productId: product.id,
        productName: product.name,
        unitPrice,
        producibleQuantity,
        totalValue,
      });
    }

    return { items, totalProductionValue };
  }

  async simulateProduction(): Promise<ProductionResponseDto> {
    const products = await this.getProducts();
    const stockMap = this.buildStockSnapshot(products);

    const { items, totalProductionValue } = this.calculateProduction(
      products,
      stockMap,
    );

    return {
      totalProductionValue,
      items,
    };
  }
}
