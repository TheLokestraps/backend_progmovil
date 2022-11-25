import CardsService from '../services/cards.js';

const CardsController = () => {
  const cardsService = CardsService();

  const getCards = async (_req, res, next) => {
    try {
      const findAllCardsData = await cardsService.findAllCards();

      res.status(200).json({ data: findAllCardsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  const getCardByUserId = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const findCardData = await cardsService.findCardsByUserID(userId);

      res.status(200).json({ data: findCardData, message: 'findAllbyID' });
    } catch (error) {
      next(error);
    }
  };

  const createCard = async (req, res, next) => {
    try {
      const CardData = req.body;
      const createCardData = await cardsService.createCard(CardData);

      res.status(201).json({ data: createCardData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  const updateCard = async (req, res, next) => {
    try {
      const cardNumber = req.params.id;
      const CardData = req.body;
      const updateCardData = await cardsService.updateCard(cardNumber, CardData);

      res.status(200).json({ data: updateCardData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  const deleteCard = async (req, res, next) => {
    try {
      const CardId = req.params.id;
      const deleteCardData = await cardsService.deleteCard(CardId);

      res.status(200).json({ data: deleteCardData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  return {
    createCard,
    deleteCard,
    getCardByUserId,
    getCards,
    updateCard,
  };
};

export default CardsController;
