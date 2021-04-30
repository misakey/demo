import React, { useState } from 'react';

import { ThemeProvider } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

import { propOr } from 'ramda';

import theme from './theme';
import Header from './Header';
import AskConsentButton from './AskConsentButton';

import { PURCHASE_SCOPE } from 'constants/scopes';


const SyncDemo:React.FunctionComponent = () => {
	const userJSON = localStorage.getItem('sync:user');
  const [user, setUser] = useState((userJSON !== null ? JSON.parse(userJSON) : null));
  const isWellConsented = (propOr('', 'scope', user) as string).includes(PURCHASE_SCOPE);

  const stopSync = () => {
    localStorage.removeItem('sync:user');
    setUser(null);
  }

  return (
    <ThemeProvider theme={theme}>
			<Header />
      <Box mt={14}>
				<AskConsentButton hasUser={user!==null} isWellConsented={isWellConsented} stopSync={stopSync} />
				{(isWellConsented) ? (
					<div>
						Choose a purchase for account {propOr('', 'email', user)} to continue. We will import data from it to fill the form.
					</div>
				) : null}
      </Box>
			<Box my={3}>
				Aucun objet en vente...
			</Box>
    </ThemeProvider>
  );
}

export default SyncDemo;