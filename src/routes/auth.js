import { Router } from 'express';
import AuthController from '../controllers/auth.js';

const AuthRoute = () => {
  const path = '/login';
  const router = Router();
  const controller = AuthController();

  router.post(`${path}`, controller.login);

  return { path, router };
};

export default AuthRoute;
