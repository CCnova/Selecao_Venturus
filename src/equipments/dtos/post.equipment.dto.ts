import { EquipmentCategory } from "../../types/Equipment.type";

export interface PostEquipmentDTO {
  name: string;
  category: EquipmentCategory;
  ppm?: number;
  wifi?: Boolean;
  consumption?: number;
}