import { Router } from 'express';
import AuthController from '../controllers/auth.js';

const AuthRoute = () => {
  const path = '/';
  const router = Router();
  const controller = AuthController();

  router.post(`${path}login`, controller.login);
  router.post(`${path}refresh`, controller.refresh);

  return { path, router };
};

export default AuthRoute;
