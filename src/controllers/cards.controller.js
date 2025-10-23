import { Card } from '../models/card.model.js';
import { DataBaseRepository } from '../repositories/json.repository.js';

const database = new DataBaseRepository('database/cards.db.json');

export const CardController = {
  getAllData: async (req, res) => {
    const cards = await database.getAllData();
    const cardsObjectArray = cards.map(
      (card) =>
        new Card(
            card?.cardNumber,
            card?.cardHolder,
            card?.expirationDate,
            card?.cvv,
            card?.email,
            // card?.id,
        ),
    );

    res.json({
      OK: true,
      message: 'Listado de cards disponible solo para el admin',
      payload: cardsObjectArray,
    });
  },

  getByCardNumber: async (req, res) => {
    const { cardNumber } = req.params;
    
    try {
      const responseData = await database.getByCardNumber(cardNumber);
      res.json({
        status: 200,
        OK: true,
        message: 'Existe card',
        payload: responseData,
      });

      return;
    } catch (error) {
      res.json({
        status: 400,
        OK: false,
        message: `No existen cards para email ${email}`,
      });
      return;
    }
  },
  getByEmail: async (req, res) => {
    const { email } = req.body;

    try {
      const responseData = await database.getByEmail(email);

      res.json({
        status: 200,
        OK: true,
        message: 'Existe card',
        payload: responseData,
      });

      return;
    } catch (error) {
      res.json({
        status: 400,
        OK: false,
        message: `No existen cards para email ${email}`,
      });
      return;
    }
    
  }, 

  createCard: async (req, res) => {
    console.log(req.body);

    const { cardNumber, cardHolder, expirationDate, cvv, email } = req.body;
    const newCreditCard = new Card(
      cardNumber,
      cardHolder,
      expirationDate,
      cvv,
      email
    );
    const response = await database.createCard(newCreditCard);

    res.json({
      status: 200,
      OK: true,
      message: 'Card creada',
      payload: response,
    });
  },

  deleteCard: async (req, res) => {
    const { cardNumber} = req.params;

    try {
      const card = await database.get
      database.deleteCard(card);

      res.json({
        status: 200,
        OK: true,
        msg: `card: ${card.cardNumber} fue eliminada de la base de datos`,
      });
    } catch (error) {
      res.json({
        status: 400,
        OK: false,
        message: error.message,
      });
      return;
    }
  },

  updateCard: async (req, res) => {
    const {  } = req.params;
    const { cardHolder, expirationDate, cvv, email } = req.body;
    try {
      const card = await database.getByCardNumber(cardNumber);

        card.cardHolder = cardHolder;
        card.expirationDate = expirationDate;
        card.cvv = cvv;
        card.email = email;

      const { oldDataCard, newDataCard } = await database.updateCard(card);

      res.json({
        status: 200,
        OK: true,
        oldDataCard,
        newDataCard,
      });
    } catch (error) {
      res.json({
        status: 400,
        OK: false,
        message: error.message,
      });
      return;
    }
  },
};
