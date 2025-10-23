 

export class Card {
  constructor(cardNumber, cardHolder, expirationDate, cvv, email) {
    this.cardNumber = cardNumber;
    this.cardHolder = cardHolder;
    this.expirationDate = expirationDate;
    this.cvv = cvv;
    this.email = email;
    //this.id = id ?? randomBytes(4).toString('hex');
  }
}
