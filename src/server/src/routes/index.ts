const easyinvoice:any = require('easyinvoice');
const fs = require('fs');

import * as express from "express";

import isEmail from '../helpers/isEmail';

import sendInvoiceConfirmationEmail from '../helpers/sendMail/sendInvoiceConfirmationEmail';

import generateInvoice from '../helpers/generateInvoice';

export const register = (app: express.Application) => {
    app.post('/producer/invoice', (req: any, res) => {
        if (isEmail(req.body.email)) {
            generateInvoice(req.body.email, req.body.cart, (result:any) => {
                // The response will contain a base64 encoded PDF file
                // MisakeySDK.send(req.body.email, 'invoice', 'json', invoiceData);
                // MisakeySDK.send(req.body.email, 'invoice', 'file', result.pdf); // Buffer.from(result.pdf.toString('utf-8'), 'base64');
                // const invitationLink = MisakeySDK.getLink(req.body.email, 'invoice');
                
                const invitationLink = 'https://app.misakey.com/lolbonsoir';

                sendInvoiceConfirmationEmail(req.body.email, result.pdf, invitationLink).then(sendEmailReturn => {
                    if (sendEmailReturn.isError) {
                        console.log(sendEmailReturn.error);
                        res.sendStatus(500);
                    } else {
                        res.send({ invitationLink });
                    }
                });
            });
        } else {
            res.status(400);
            res.send({ message: 'Merci de rentrer un email valide.'});
        }
    })
};
