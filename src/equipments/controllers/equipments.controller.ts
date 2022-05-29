import express from "express";
import { EquipmentCategory } from "../../types/Equipment.type";
import EquipmentsService from "../services/equipments.service";

class EquipmentsController {

  async list(req: express.Request, res: express.Response) {
    const equipments = await EquipmentsService.list();
    res.status(200).send(equipments);
  }

  async post(req: express.Request, res: express.Response) {
    const dto = req.body;
    const result = await EquipmentsService.create({
      ...dto,
      category: EquipmentCategory[dto.category],
    });
    res.status(201).send(result);
  }

  async getById(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const equipment = await EquipmentsService.get(parseInt(id));
    res.status(200).send(equipment);
  }

  async delete(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const result = await EquipmentsService.delete(parseInt(id));
    res.status(204).send(result);
  }

  async put(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const dto = req.body;
    dto.category = EquipmentCategory[dto.category];
    const result = await EquipmentsService.put({ id: parseInt(id), ...dto});
    res.status(204).send(result);
  }

  async patch(req: express.Request, res: express.Response) {
    const { id } = req.params;
    const dto = req.body;
    dto.category = EquipmentCategory[dto.category];
    const result = await EquipmentsService.patch({ id: parseInt(id), ...dto });
    res.status(204).send(result);
  }

}

export default new EquipmentsController();
