import dotenv from "dotenv";
import express from "express";
import registerRoutes from "./routes";

const morgan = require('morgan');

import logger from './logger';

dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();


app.use(morgan(':method :url', { immediate: true, stream: { write: (message:string) => logger.info(message) }}));
app.use(morgan(process.env.ENV === 'development' ? 'dev' : 'tiny', { stream: { write: (message:string) => logger.info(message) }}));
app.use(express.json());

// Configure routes
registerRoutes(app);

// start the express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    logger.info(`server started at http://localhost:${port} for environment ${process.env.ENV}`);
});
