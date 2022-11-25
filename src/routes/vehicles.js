import { Router } from 'express';
import VehicleController from '../controllers/vehicles.js';
import authMiddleware from '../middlewares/auth.js';

const UsersRoute = () => {
  const path = '/vehicles';
  const router = Router();
  const controller = VehicleController();

  router.get(`${path}`, authMiddleware, controller.getVehicles);
  router.get(`${path}`, authMiddleware, controller.getVehicleByRegistration);
  router.get(`${path}`, authMiddleware, controller.getVehicleByUserId);
  router.post(`${path}`, authMiddleware, controller.createVehicle);
  router.put(`${path}/:id`, authMiddleware, controller.updateVehicle);
  router.delete(`${path}/:id`, authMiddleware, controller.deleteVehicle);

  return { path, router };
};

export default UsersRoute;
