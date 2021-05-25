import React, { useState } from 'react';

import { ThemeProvider } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

import { propOr } from 'ramda';

import theme from '../VaultDemo/theme';
import Header from './Header';
import DataViz from './DataViz';
import AskConsentButton from './AskConsentButton';

import api from 'helpers/api';

import { PURCHASE_SCOPE } from 'constants/scopes';

const SyncDemo:React.FunctionComponent = () => {
	const userJSON = localStorage.getItem('sync:user');
  const [user, setUser] = useState((userJSON !== null ? JSON.parse(userJSON) : null));
  const isWellConsented = (propOr('', 'scope', user) as string).includes(PURCHASE_SCOPE);
  const [isFetching, setIsFetching] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  if (isWellConsented && !isFetching && !isFetched) {
    setIsFetching(true);
    api.get(`/consumer/invoice/${propOr('', 'email', user)}/${window.env.MISAKEY_PRODUCER_ORG_ID}`)
    .then(data => {
      setPurchases(data);
      setIsFetched(true);
    })
    .catch(e => {
      console.error(e);
      setIsFetched(true);
    })
    .finally(() => setIsFetching(false));
  }

  const stopSync = () => {
    localStorage.removeItem('sync:user');
    setUser(null);
  }

  return (
    <ThemeProvider theme={theme}>
			<Header />
      <Box mt={14} mb={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {(isWellConsented) ? (<div>{propOr('', 'email', user)}</div>) : (<div></div>)}
          <AskConsentButton hasUser={user!==null} isWellConsented={isWellConsented} stopSync={stopSync} />

        </Box>
				{(isWellConsented) ? (
          <>
            {(isFetching) ? 'Fetching' : (
              <DataViz purchases={purchases} />
            )}
          </>
				) : null}
      </Box>
    </ThemeProvider>
  );
}

export default SyncDemo;