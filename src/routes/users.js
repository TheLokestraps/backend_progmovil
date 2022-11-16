import { Router } from 'express';
import UsersController from '../controllers/users.js';

const UsersRoute = () => {
  const path = '/users';
  const router = Router();
  const controller = UsersController();

  router.get(`${path}`, controller.getUsers);
  router.get(`${path}/:id`, controller.getUserById);
  router.post(`${path}`, controller.createUser);
  router.post(`${path}/login`, controller.loginUser);

  return { path, router };
};

export default UsersRoute;
