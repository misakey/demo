import * as express from "express";

import misakey from '~/constants/misakey/consumer';

const CALLBACK_CONFIG = {
  client: process.env.MISAKEY_CLIENT_CONSUMER_CALLBACK_CLIENT,
  server: process.env.MISAKEY_CLIENT_CONSUMER_CALLBACK_SERVER,
}

export const authCallback = async (req: express.Request, res: express.Response) => {
  try {
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
}
