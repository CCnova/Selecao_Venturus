export enum EquipmentCategory {
  Cartridge,
  Toner,
}

export type Equipment = {
  id: number;
  name: string;
  category: EquipmentCategory;
  ppm?: number;
  wifi?: Boolean;
  consumption?: number;
};