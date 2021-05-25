import React, { useState } from 'react';

import {
    Redirect
  } from "react-router-dom";

  import misakeySdk from 'constants/misakeySDK';


const AuthCallback:React.FunctionComponent = () => {
  const [redirect, setRedirect] = useState('');
  const [callBackLaunched, setCallBackLaunched] = useState(false);

  if (callBackLaunched === false) {
      setCallBackLaunched(true);
      misakeySdk.validateUserConsent().then(({ user, expiresAt, callbackHints }:any) => {
        const { referrer } = callbackHints;
        localStorage.setItem('sync:user', JSON.stringify(user));
        localStorage.setItem('sync:expiresAt', expiresAt);
        setRedirect(referrer);
      });  
  }
  if (redirect !== '') {
      return (<Redirect to={redirect} />);
  }
  return null;
}

export default AuthCallback;