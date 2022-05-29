import { Database, RunResult } from "sqlite3";
import database from "../../database/database";
import { PatchEquipmentDTO } from "../dtos/patch.equipment.dto";
import { PostEquipmentDTO } from "../dtos/post.equipment.dto";
import { PutEquipmentDTO } from "../dtos/put.equipment.dto";

class EquipmentsDAO {
  database: Database;

  constructor(database: Database) {
    this.database = database;
    this.createTable();
  }

  createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS equipments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL DEFAULT '',
        category TEXT CHECK( category IN ('Cartridge', 'Toner') ) NOT NULL DEFAULT 'Cartridge',
        ppm BIGINT NULL DEFAULT NULL,
        wifi BOOLEAN NULL DEFAULT NULL,
        consumption FLOAT NULL DEFAULT NULL
      )
    `;

    return this.database.run(query, (_: RunResult, err: Error | null) => {
      if (err) throw new Error("Failed to create Equipments Table!");
    });
  }

  list() {
    const query = `
      SELECT * FROM equipments
    `;

    return new Promise<any>((resolve, reject) => {
      this.database.all(query, (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  create(postEquipmentDTO: PostEquipmentDTO) {
    const columns = Object.keys(postEquipmentDTO);
    const query = `
      INSERT INTO equipments (${columns.join(", ")}) VALUES (${columns
      .map((col) => "?")
      .join(", ")})
    `;

    return new Promise<any>((resolve, reject) => {
      this.database.run(
        query,
        Object.values(postEquipmentDTO),
        (result: RunResult, err: Error | null) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }

  replace(putEquipmentDTO: PutEquipmentDTO) {
    const columns: Array<keyof PutEquipmentDTO> = [
      "name",
      "category",
      "ppm",
      "wifi",
      "consumption",
    ];
    const columnsWithPlaceholder = columns.map((col) => `${col} = ?`);
    const query = `
      UPDATE equipments SET ${columnsWithPlaceholder.join(", ")} WHERE id = ?
    `;
    const params = [
      ...columns.map((col) => putEquipmentDTO[col] ?? null),
      putEquipmentDTO.id,
    ];
    return new Promise<any>((resolve, reject) => {
      this.database.run(query, params, (result: RunResult, err: Error | null) =>
        err ? reject(err) : resolve(result)
      );
    });
  }

  get(id: number) {
    const query = `
      SELECT * FROM equipments WHERE id = ?
    `;

    return new Promise<any>((resolve, reject) => {
      this.database.get(query, [id], (err: Error | null, result: RunResult) =>
        err ? reject(err) : resolve(result)
      );
    });
  }

  delete(id: number) {
    const query = `
      DELETE FROM equipments WHERE id = ?
    `;

    return new Promise<any>((resolve, reject) => {
      this.database.run(query, [id], (result: RunResult, err: Error | null) =>
        err ? reject(err) : resolve(result)
      );
    });
  }

  patch(patchEquipmentDTO: PatchEquipmentDTO) {
    const columnsToUpdate = Object.keys(patchEquipmentDTO).filter(
      (key) => key !== "id"
    );
    const columnsWithPlaceholder = columnsToUpdate
      .map((col) => `${col} = ?`)
      .join(", ");
    const query = `
      UPDATE equipments SET ${columnsWithPlaceholder} WHERE id = ?
    `;
    const params = [
      ...columnsToUpdate.map(
        (col) => patchEquipmentDTO[col as keyof PatchEquipmentDTO]
      ),
    ];

    return new Promise<any>((resolve, reject) => {
      this.database.run(query, params, (result: RunResult, err: Error | null) =>
        err ? reject(err) : resolve(result)
      );
    });
  }
}

export default new EquipmentsDAO(database);
