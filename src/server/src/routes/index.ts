const easyinvoice:any = require('easyinvoice');
const fs = require('fs');

import * as express from "express";

const Misakey = require('@misakey/sdk');

import { postInvoiceProducer } from './producer/invoice';

const CALLBACK_CONFIG = {
    client: 'http://localhost:3000/sync/callback',
    server: 'http://localhost:5000/user/callback'
  }

const registerRoutes = (app: express.Application) => {
    app.post('/producer/invoice', postInvoiceProducer);
    app.get('/user/callback', async (req: express.Request, res: express.Response) => {
        try {
            const misakey = new Misakey(process.env.MISAKEY_CLIENT_ID, process.env.MISAKEY_CLIENT_SECRET);
            const { 
              idToken, 
              clientCallbackLocation, 
              accessToken,
            } = await misakey.exchangeUserToken(req.query, CALLBACK_CONFIG);
    
            res.setHeader('Set-Cookie', `misakey_access_token=${accessToken}; HttpOnly`);
            
            res.writeHead(302, { Location: clientCallbackLocation });
            res.end();
        } catch (error) {
            try {
              console.error('ERROR:', error);
              console.log('ERROR INFO', Object.getOwnPropertyNames(error.message))
              res.writeHead(302, {Location: `${CALLBACK_CONFIG.client}?error=${error.message}`});
              res.send();
            } finally {
              res.status(500);
            }
        }
    });
};

export default registerRoutes;
