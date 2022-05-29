import express from "express";
import { RoutesConfig } from "../common/routes.config";
import EquipmentsController from "./controllers/equipments.controller";

export class EquipmentsRoutesConfig extends RoutesConfig {
  constructor(app: express.Application) {
    super(app, "EquipmentsRoutes");
  }

  configure() {
    this.app
      .route("/api/equipments")
      .get(EquipmentsController.list)
      .post(EquipmentsController.post);

    this.app
      .route("/api/equipments/:id")
      .get(EquipmentsController.getById)
      .put(EquipmentsController.put)
      .patch(EquipmentsController.patch)
      .delete(EquipmentsController.delete);

    return this.app;
  }
}
