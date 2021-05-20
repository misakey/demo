const easyinvoice:any = require('easyinvoice');
import getRandomInt from './getRandomInt';
import capitalizeFirstLetter from './capitalize'

interface Cart {
  color: string;
  price: number;
}

type Callback = (result:any) => void;

const generateInvoice = (email:string, cart: Cart, callback: Callback) => {
  const date = new Date();
  // Generate PDF
  const invoiceData = {
    "documentTitle": "FACTICE - FACTURE",
    "currency": "EUR",
    "taxNotation": "TVA",
    "marginTop": 25,
    "marginRight": 25,
    "marginLeft": 25,
    "marginBottom": 25,
    "logo": "https://static.misakey.com/img/demo/LogoMTS.png",
    "sender": {
        "company": "AppDemo",
        "address": "1 Rue de la liberté",
        "zip": "75001",
        "city": "Paris",
        "country": "France"
    },
    "client": {
        "company": capitalizeFirstLetter(email.split('@')[0]),
        "address": email,
        "zip": "",
        "city": "",
        "country": "",
    },
    "invoiceNumber": getRandomInt(5534, 999999),
    "invoiceDate": date.toLocaleDateString("fr-FR"),
    "products": [
        {
            "quantity": "1",
            "description": `Chaussures ${cart.color}`,
            "price": cart.price / 1.2,
            "tax": 20,
        }
    ],
    "bottomNotice": "Ceci est une démo factice dans le cadre de la démonstration Misakey. Plus d'infos sur https://demo.misakey.com."
  };

  easyinvoice.createInvoice(invoiceData, (result:any) => {
    const invoiceDataFile = JSON.stringify(invoiceData);
    result.jsonBuff = Buffer.from(invoiceDataFile);;
    result.pdfBuff = Buffer.from(result.pdf, 'base64');
    result.invoiceData = invoiceData;
    callback(result);
  });
}

export default generateInvoice;
