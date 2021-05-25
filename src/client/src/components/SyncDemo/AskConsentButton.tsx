import React from 'react';

import Button from '@material-ui/core/Button'


import misakeySdk from 'constants/misakeySDK';

import { PURCHASE_SCOPE } from 'constants/scopes';


interface AskConsentButtonProps {
  hasUser:boolean,
  isWellConsented:boolean,
  stopSync: () => void,
}

const AskConsentButton = ({ hasUser, isWellConsented, stopSync }:AskConsentButtonProps):React.ReactElement => {
  if (isWellConsented) {
    return (
      <Button variant="contained" color="primary" onClick={stopSync}>Deconnexion</Button>
    );
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => misakeySdk.userConsent('', [ PURCHASE_SCOPE ])}>Me connecter</Button>
      {(hasUser) ? (
        <div>
          Vous devez consentir au partage de vos achats pour continuer
        </div>
      ) : null}
    </>
  );
}

export default AskConsentButton;