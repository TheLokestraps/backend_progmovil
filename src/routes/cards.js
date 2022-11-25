import { Router } from 'express';
import CardsController from '../controllers/cards.js';
import authMiddleware from '../middlewares/auth.js';

const CardsRoute = () => {
  const path = '/cards';
  const router = Router();
  const controller = CardsController();

  router.get(`${path}`, controller.getCards);
  router.get(`${path}/:id`, controller.getCardByUserId);
  router.post(`${path}`, authMiddleware, controller.createCard);
  router.put(`${path}/:id`, controller.updateCard);
  router.delete(`${path}/:id`, controller.deleteCard);

  return { path, router };
};

export default CardsRoute;
