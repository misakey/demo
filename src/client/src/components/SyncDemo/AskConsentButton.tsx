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
      <Button variant="contained" color="primary" onClick={stopSync}>Arrêter la syncro</Button>
    );
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => misakeySdk.userConsent('', [ PURCHASE_SCOPE ])}>Importer mes achats</Button>
      {(hasUser) ? (
        <div>
          Vous devez consentir au partage de vos achats pour continuer
        </div>
      ) : null}
    </>
  );
}

export default AskConsentButton;