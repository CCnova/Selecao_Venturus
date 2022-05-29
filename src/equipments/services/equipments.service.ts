import { CRUD } from "../../interfaces/crud.interface";
import EquipmentsDao from "../daos/equipments.dao";
import { PatchEquipmentDTO } from "../dtos/patch.equipment.dto";
import { PostEquipmentDTO } from "../dtos/post.equipment.dto";
import { PutEquipmentDTO } from "../dtos/put.equipment.dto";

class EquipmentsService implements CRUD {

  list () {
    return EquipmentsDao.list();
  }

  create(postEquipmentDTO: PostEquipmentDTO) {
    return EquipmentsDao.create(postEquipmentDTO);
  }

  put(putEquipmentDTO: PutEquipmentDTO) {
    return EquipmentsDao.replace(putEquipmentDTO);
  }

  get(id: number) {
    return EquipmentsDao.get(id);
  }

  delete(id: number) {
    return EquipmentsDao.delete(id);
  }

  patch(patchEquipmentDTO: PatchEquipmentDTO) {
    return EquipmentsDao.patch(patchEquipmentDTO);
  }
}

export default new EquipmentsService();