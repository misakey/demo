const Misakey = require('@misakey/sdk');


const misakey:any = new Misakey(process.env.MISAKEY_CLIENT_PRODUCER_ID, process.env.MISAKEY_CLIENT_PRODUCER_SECRET, process.env.MISAKEY_CLIENT_CONSUMER_CRYPTO_SECRET);

export default misakey;
