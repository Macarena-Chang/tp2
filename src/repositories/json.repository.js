import fs from 'fs/promises';
import { Card } from '../models/card.model.js';
import e from 'express';

export class DataBaseRepository {
  constructor(path) {
    this.path = path;
  }

  async getAllData() {
    const data = await fs.readFile(this.path, { encoding: 'utf8' });
    return await JSON.parse(data);
  }

  async getByEmail(email) {
    const data = await this.getAllData();
  

    if (!data) {
      throw new Error('Esta vacio');
    }

    const filteredData = data.filter((card) => card.email === email);

    console.log(filteredData);

    if (!filteredData || filteredData.length === 0)
      throw new Error(`No existe este card: ${email}`);

    const objetoPlain = filteredData[0];

    const card = new Card(
      objetoPlain.cardNumber,
      objetoPlain.cardHolder,
      objetoPlain.expirationDate,
      objetoPlain.cvv,
      objetoPlain.email,
      // objetoPlain.id,
    
    );

    return card;
  }


  async getByCardNumber(cardNumber) {
    const data = await this.getAllData();
  

    if (!data) {
      throw new Error('Esta vacio');
    }

    const filteredData = data.filter((card) => card.cardNumber === cardNumber);

    console.log(filteredData);

    if (!filteredData || filteredData.length === 0)
      throw new Error(`No existe este card: ${cardNumber}`);

    const objetoPlain = filteredData[0];

    const card = new Card(
      objetoPlain.cardNumber,
      objetoPlain.cardHolder,
      objetoPlain.expirationDate,
      objetoPlain.cvv,
      objetoPlain.email,
      // objetoPlain.id,
    
    );

    return card;
  }

  async createCard(card) {
    const data = await this.getAllData();

    data.push(card);

    await fs.writeFile(this.path, JSON.stringify(data, null, 2));

    return {
      emailCard: card.email,
    };
  }

  // Borrar

  async deleteCard(card) {
    const { email } = card;

    const data = await this.getAllData();

    const filteredData = data.filter((card) => card.email !== email);

    await fs.writeFile(this.path, JSON.stringify(filteredData, null, 2));

    return {
      emailCard: email,
    };
  }

  // Actualizar (deberia ser por cvv!!! por email puede haber varias, corregir)
  async updateCard(card) {
    const { email } = card;

    const data = await this.getAllData();

    const filteredData = data.filter((card) => card.email !== email);
    const oldDataCard= data.filter((card) => card.email === email);

    filteredData.push(card);

    await fs.writeFile(this.path, JSON.stringify(filteredData, null, 2));

    return { oldDataCard, newDataCard: card};
  }
}

 