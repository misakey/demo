// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { MisakeyClient } from '@misakey/sdk';
// const { MisakeyClient } = require('@misakey/sdk');


const misakeySdk:any = new MisakeyClient({
    organizationId: window.env.MISAKEY_CONSUMER_ORG_ID,
    redirectUri: window.env.MISAKEY_SYNC_REDIRECT_URI,
  });

  export default misakeySdk;
