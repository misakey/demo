// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { MisakeyClient } from '@misakey/sdk';
// const { MisakeyClient } = require('@misakey/sdk');


const misakeySdk:any = new MisakeyClient({
    organizationId: window.env.MISAKEY_CLIENT_ID,
    redirectUri: window.env.MISAKEY_REDIRECT_URI,
  });

  export default misakeySdk;
