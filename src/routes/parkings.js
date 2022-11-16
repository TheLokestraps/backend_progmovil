import { Router } from 'express';
import ParkingsController from '../controllers/parkings.js';

const ParkingsRoute = () => {
  const path = '/parkings';
  const router = Router();
  const controller = ParkingsController();

  router.get(`${path}`, controller.getParkings);
  router.get(`${path}/:id`, controller.getParkingById);
  router.post(`${path}`, controller.createParking);
  router.put(`${path}/:id`, controller.updateParking);
  router.delete(`${path}/:id`, controller.deleteParking);

  return { path, router };
};

export default ParkingsRoute;
