import express from 'express';
import { RoutesConfig } from './common/routes.config';
import { EquipmentsRoutesConfig } from './equipments/equipments.routes.config';

const PORT = process.env.PORT || 3000;
const app = express();
const routes: Array<RoutesConfig> = [];

app.use(express.json());

routes.push(new EquipmentsRoutesConfig(app));

app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
  routes.forEach(route => route.configure());
});