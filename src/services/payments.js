import db from '../../firebase.config.js';
import { PAYMENTS_COLLECTION } from '../constant/collections.js';
import HttpException from '../exceptions/HttpException.js';
import VehiclesService from './vehicle.js';
import ParkingsService from './parkings.js';
import UsersService from './users.js';
import CardsService from './cards.js';

const PaymentsService = () => {
  const paymentsRef = db.collection(PAYMENTS_COLLECTION);
  const vehiclesService = VehiclesService();
  const parkingsService = ParkingsService();
  const usersService = UsersService();
  const cardsService = CardsService();

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

    const total = payment.value * payment.hoursSpent;

    const user = await usersService.findUserById(payment.userId);
    const vehicle = await vehiclesService.findVehicleById(payment.vehicleId);
    const parking = await parkingsService.findParkingById(payment.parkingId);
    const card = await cardsService.findCardByCardNumber(payment.cardId);

    if (card.balance < total) throw new HttpException(409, 'User balance is not enough.');

    if (user.email !== vehicle.userEmail) throw new HttpException(409, 'User and vehicle are not related.');

    let found = false;
    parking.vehicles.forEach((park) => {
      if (park === vehicle.registration) found = true;
    });

    if (!found) throw new HttpException(409, 'Vehicle is not in the parking.');

    const createPaymentData = await (await paymentsRef.add({ ...payment })).get();

    const newBalance = card.balance - total;

    await cardsService.updateCard(card.cardNumber, { balance: newBalance });
    await parkingsService.deleteVehicleFromParking(parking.id, vehicle.registration);

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

  const findAllPaymentsByUserId = async (userId) => {
    const queryPayments = await paymentsRef.where('userId', '==', userId).get();

    if (queryPayments.empty) throw new HttpException(409, 'You dont have any payments.');

    const Payments = queryPayments.docs.map(
      (Payment) => ({ id: Payment.id, ...Payment.data() }),
    );

    return { ...Payments };
  };

  return {
    createPayment,
    deletePayment,
    findAllPayments,
    findPaymentById,
    findAllPaymentsByUserId,
    updatePayment,
  };
};

export default PaymentsService;
