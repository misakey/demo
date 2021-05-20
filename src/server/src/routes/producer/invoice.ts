import { Request, Response } from "express";

import isEmail from '~/helpers/isEmail';
import sendInvoiceConfirmationEmail from '~/helpers/sendMail/sendInvoiceConfirmationEmail';
import generateInvoice from '~/helpers/generateInvoice';

import misakey from '~/constants/misakey/producer';

import logger from '~/logger';

export const postInvoiceProducer = (req: Request, res: Response) => {
  if (isEmail(req.body.email)) {
      generateInvoice(req.body.email, req.body.cart, async (result:any) => {
          // The response will contain a base64 encoded PDF file
          try {
              const { invitationLink } = await misakey.pushMessages({
                messages: [
                  `Merci pour votre commande !`,
                  `Vous avez commandé une paire de chaussures ${req.body.cart.color} à ${req.body.cart.price}€.`,
                  `Voici votre facture:`,
                  {
                    data: result.pdfBuff,
                    filename: `facture-${result.invoiceData.invoiceNumber}.pdf`,
                  },
                  {
                    data: result.jsonBuff,
                    filename: `facture-${result.invoiceData.invoiceNumber}.json`,
                  },
                ],
                boxTitle: `Commande n°${result.invoiceData.invoiceNumber}`,
                dataSubject: req.body.email,
                dataTag: 'purchase'
              });

              sendInvoiceConfirmationEmail(req.body.email, result.pdf, invitationLink, result.invoiceData).then((sendEmailReturn:any) => {
                if (sendEmailReturn.isError) {
                  if (sendEmailReturn.error.Type === 'Sender' && sendEmailReturn.error.Code === 'AccessDenied') {
                      // res.sendStatus(418);
                      res.status(403);
                      res.send({ message: "En pre-production vous ne pouvez envoyer utiliser que les emails en @misakey.com" });
                  } else {
                      logger.error(sendEmailReturn.error);
                      res.status(500);
                      res.send({ message: "Une erreur est survenue lors de l'envoie du mail de confirmation. Veuillez ré-essayer."});
                  }
                } else {
                    res.send({ invitationLink });
                }
            });
          } catch (error) {
              try {
              const jsonBody = await error.json();
              console.error('ERROR:', jsonBody);
              } catch {
              console.error('ERROR:', error);
              } finally {
                res.status(500);
              }
          }
      });
  } else {
      res.status(400);
      res.send({ message: 'Merci de rentrer un email valide.'});
  }
};