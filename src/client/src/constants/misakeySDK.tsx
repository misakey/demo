// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { MisakeyClient } from '@misakey/sdk';
// const { MisakeyClient } = require('@misakey/sdk');


const misakeySdk:any = new MisakeyClient({
    organizationId: window.env.MISAKEY_CLIENT_ID,
    redirectUri: 'http://localhost:5000/user/callback'
  });

  export default misakeySdk;
