import { Router } from 'express';
import PaymentsController from '../controllers/payments.js';

const PaymentsRoute = () => {
  const path = '/payments';
  const router = Router();
  const controller = PaymentsController();

  router.get(`${path}`, controller.getPayments);
  router.get(`${path}/:id`, controller.getPaymentById);
  router.post(`${path}`, controller.createPayment);
  router.put(`${path}/:id`, controller.updatePayment);
  router.delete(`${path}/:id`, controller.deletePayment);

  return { path, router };
};

export default PaymentsRoute;
