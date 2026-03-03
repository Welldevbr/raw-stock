import { ProductionResult } from "../interfaces/production-result.interface";

export class ProductionResponseDto {
  totalProductionValue!: number;
  items!: ProductionResult[];
}
