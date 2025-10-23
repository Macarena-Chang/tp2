 

import express from 'express';
import { CardController } from '../controllers/cards.controller.js';

const cardRouter = express.Router();
const { getAllData , getByEmail, createCard, deleteCard, updateCard } = CardController;

cardRouter
  .get('/api/cards', getAllData)
  .get('/api/cards/:email', getByEmail)
  .post('/api/card', createCard)
  .delete('/api/card/:cardNumber', deleteCard)
  .put('/api/card/:cardNumber', updateCard);  

export default cardRouter;
