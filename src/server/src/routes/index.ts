const easyinvoice:any = require('easyinvoice');
const fs = require('fs');

import * as express from "express";

import { postInvoiceProducer } from './producer/invoice';

const registerRoutes = (app: express.Application) => {
    app.post('/producer/invoice', postInvoiceProducer);
};

export default registerRoutes;