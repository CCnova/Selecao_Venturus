import { EquipmentCategory } from "../../types/Equipment.type";

export interface PutEquipmentDTO {
  id: number;
  name: string;
  category: EquipmentCategory;
  ppm?: number;
  wifi?: boolean;
  consumption?: number;
}