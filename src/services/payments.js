import db from '../../firebase.config.js';
import { PAYMENTS_COLLECTION } from '../constant/collections.js';
import HttpException from '../exceptions/HttpException.js';

const PaymentsService = () => {
  const paymentsRef = db.collection(PAYMENTS_COLLECTION);

  const findAllPayments = async () => {
    const queryPayments = await paymentsRef.get();
    const payments = queryPayments.docs.map((payment) => ({ id: payment.id, ...payment.data() }));

    return payments;
  };

  const findPaymentById = async (paymentId) => {
    if (!paymentId) throw new HttpException(400, 'PaymentId not available.');

    const findPayment = await paymentsRef.doc(paymentId).get();
    if (!findPayment.exists) throw new HttpException(409, "Isn't a payment.");

    return { id: findPayment.id, ...findPayment.data() };
  };

  const createPayment = async (payment) => {
    if (!payment) throw new HttpException(400, 'Payment data not available.');

    const createPaymentData = await (await paymentsRef.add({ ...payment })).get();

    return { id: createPaymentData.id, ...createPaymentData.data() };
  };

  const updatePayment = async (paymentId, payment) => {
    if (!payment) throw new HttpException(400, 'Payment data not available.');

    /* TODO: unique payment validation. i.e.
    if (payment.value && payment.userId) {
      const findPayment = await paymentsRef
        .where('value', '==', payment.value)
        .where('userId', '==', payment.userId)
        .get();
      if (findPayment.empty) throw new HttpException(409, "This payment doesn't exists.");
    }
    */

    const updatePaymentById = await paymentsRef.doc(paymentId).update({ ...payment });
    if (!updatePaymentById) throw new HttpException(409, 'Update not available now, try later.');

    const updatedPayment = await paymentsRef.doc(paymentId).get();

    return { id: updatedPayment.id, ...updatedPayment.data() };
  };

  const deletePayment = async (paymentId) => {
    const deletePaymentById = await paymentsRef.doc(paymentId).delete();
    if (!deletePaymentById) throw new HttpException(409, 'Delete not available now, try later.');

    return deletePaymentById;
  };

  return {
    createPayment,
    deletePayment,
    findAllPayments,
    findPaymentById,
    updatePayment,
  };
};

export default PaymentsService;
