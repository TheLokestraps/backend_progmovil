import { Router } from 'express';
import HomeController from '../controllers/home.js';

const HomeRoute = () => {
  const path = '/';
  const router = Router();
  const controller = HomeController();

  router.get(`${path}`, controller.index);

  return { path, router };
};

export default HomeRoute;
