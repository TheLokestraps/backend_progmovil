import db from '../../firebase.config.js';
import { CARDS_COLLECTION } from '../constant/collections.js';
import HttpException from '../exceptions/HttpException.js';

const CardsService = () => {
  const CardsRef = db.collection(CARDS_COLLECTION);

  const findAllCards = async () => {
    const queryCards = await CardsRef.get();
    const Cards = queryCards.docs.map((payment) => ({ id: payment.id, ...payment.data() }));

    return Cards;
  };

  const findCardByCardNumber = async (cardNumber) => {
    if (!cardNumber) throw new HttpException(400, 'Card Number not available.');

    const queryCard = await CardsRef.where('cardNumber', '==', cardNumber).get();

    if (queryCard.empty) throw new HttpException(409, "Card doesn't exists.");

    const card = queryCard.docs.map((payment) => ({ id: payment.id, ...payment.data() }))[0];

    return { ...card };
  };

  const findCardsByUserID = async (cardOwnerId) => {
    const queryCards = await CardsRef.where('cardOwnerId', '==', cardOwnerId).get();
    const Cards = queryCards.docs.map((payment) => ({ id: payment.id, ...payment.data() }));

    return Cards;
  };

  const createCard = async (payment) => {
    if (!payment) throw new HttpException(400, 'Payment data not available.');

    const queryCard = await CardsRef.where('cardNumber', '==', payment.cardNumber).get();

    if (!queryCard.empty) throw new HttpException(409, 'Card already exists.');

    if (!payment.balance || payment.balance < 0) throw new HttpException(409, 'Balance must be greater than 0.');

    if (!payment.company) throw new HttpException(409, 'Must have a company.');

    const createPaymentData = await (await CardsRef.add({ ...payment })).get();

    return { id: createPaymentData.id, ...createPaymentData.data() };
  };

  const updateCard = async (cardNumber, card) => {
    if (!card) throw new HttpException(400, 'Card data not available.');

    /* TODO: unique payment validation. i.e.
    if (payment.value && payment.userId) {
      const findPayment = await CardsRef
        .where('value', '==', payment.value)
        .where('userId', '==', payment.userId)
        .get();
      if (findPayment.empty) throw new HttpException(409, "This payment doesn't exists.");
    }
    */

    const cardToUpdate = await CardsRef.where('cardNumber', '==', cardNumber).get();

    if (cardToUpdate.empty) throw new HttpException(409, "This card doesn't exists.");

    const cardId = cardToUpdate.docs.map((payment) => ({
      id: payment.id, ...payment.data(),
    }))[0].id;

    const updatePaymentById = await CardsRef.doc(cardId).update({ ...card });
    if (!updatePaymentById) throw new HttpException(409, 'Update not available now, try later.');

    const updatedPayment = await CardsRef.doc(cardId).get();

    return { id: updatedPayment.id, ...updatedPayment.data() };
  };

  const deleteCard = async (cardNumber) => {
    const cardToUpdate = await CardsRef.where('cardNumber', '==', cardNumber).get();

    if (cardToUpdate.empty) throw new HttpException(409, "This card doesn't exists.");

    const cardId = cardToUpdate.docs.map((payment) => ({
      id: payment.id, ...payment.data(),
    }))[0].id;

    const deletePaymentById = await CardsRef.doc(cardId).delete();
    if (!deletePaymentById) throw new HttpException(409, 'Delete not available now, try later.');

    return deletePaymentById;
  };

  return {
    createCard,
    findAllCards,
    findCardsByUserID,
    findCardByCardNumber,
    updateCard,
    deleteCard,
  };
};

export default CardsService;
