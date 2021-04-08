import { Request, Response } from "express";

import isEmail from '~/helpers/isEmail';
import sendInvoiceConfirmationEmail from '~/helpers/sendMail/sendInvoiceConfirmationEmail';
import generateInvoice from '~/helpers/generateInvoice';

import logger from '~/logger';

export const postInvoiceProducer = (req: Request, res: Response) => {
  if (isEmail(req.body.email)) {
      generateInvoice(req.body.email, req.body.cart, (result:any) => {
          // The response will contain a base64 encoded PDF file

          // MisakeySDK.send(req.body.email, 'invoice', 'file', result.json);
          // MisakeySDK.send(req.body.email, 'invoice', 'file', result.pdf); // Buffer.from(result.pdf.toString('utf-8'), 'base64');
          // const invitationLink = MisakeySDK.getLink(req.body.email, 'invoice');
          
          const invitationLink = 'https://app.misakey.com/lolbonsoir';

          sendInvoiceConfirmationEmail(req.body.email, result.pdf, invitationLink).then((sendEmailReturn:any) => {
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
      });
  } else {
      res.status(400);
      res.send({ message: 'Merci de rentrer un email valide.'});
  }
};