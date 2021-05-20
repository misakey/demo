import { Application } from "express";

import { postInvoiceProducer } from './producer/invoice';
import { authCallback } from './consummer/user';
import { getInvoices } from './consummer/data';

const registerRoutes = (app: Application) => {
    app.post('/producer/invoice', postInvoiceProducer);
    app.get('/user/callback', authCallback);
    app.get('/consumer/invoice/:dataSubject/:producerId', getInvoices);
};

export default registerRoutes;
