import PaymentsService from '../services/payments.js';

const PaymentsController = () => {
  const paymentsService = PaymentsService();

  const getPayments = async (_req, res, next) => {
    try {
      const findAllPaymentsData = await paymentsService.findAllPayments();

      res.status(200).json({ data: findAllPaymentsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  const getAllPaymentsByUserId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const findPaymentData = await paymentsService.findAllPaymentsByUserId(id);

      res.status(200).json({ data: findPaymentData, message: 'findAllByID' });
    } catch (error) {
      next(error);
    }
  };

  const getPaymentById = async (req, res, next) => {
    try {
      const paymentId = req.params.id;
      const findPaymentData = await paymentsService.findPaymentById(paymentId);

      res.status(200).json({ data: findPaymentData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  const createPayment = async (req, res, next) => {
    try {
      const paymentData = req.body;
      const createPaymentData = await paymentsService.createPayment(paymentData);

      res.status(201).json({ data: createPaymentData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  const updatePayment = async (req, res, next) => {
    try {
      const paymentId = req.params.id;
      const paymentData = req.body;
      const updatePaymentData = await paymentsService.updatePayment(paymentId, paymentData);

      res.status(200).json({ data: updatePaymentData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  const deletePayment = async (req, res, next) => {
    try {
      const paymentId = req.params.id;
      const deletePaymentData = await paymentsService.deletePayment(paymentId);

      res.status(200).json({ data: deletePaymentData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  return {
    createPayment,
    deletePayment,
    getPaymentById,
    getAllPaymentsByUserId,
    getPayments,
    updatePayment,
  };
};

export default PaymentsController;
