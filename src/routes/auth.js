import { Router } from 'express';
import AuthController from '../controllers/auth.js';

const AuthRoute = () => {
  const path = '/';
  const router = Router();
  const controller = AuthController();

  router.post(`${path}login`, controller.login);

  return { path, router };
};

export default AuthRoute;
