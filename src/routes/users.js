import { Router } from 'express';
import UsersController from '../controllers/users.js';
import authMiddleware from '../middlewares/auth.js';

const UsersRoute = () => {
  const path = '/users';
  const router = Router();
  const controller = UsersController();

  router.get(`${path}`, authMiddleware, controller.getUsers);
  router.get(`${path}/:id`, controller.getUserById);
  router.post(`${path}`, controller.createUser);
  router.put(`${path}/:id`, controller.updateUser);
  router.delete(`${path}/:id`, controller.deleteUser);

  return { path, router };
};

export default UsersRoute;
