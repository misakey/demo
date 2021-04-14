import React from 'react';

import Container from '@material-ui/core/Container';

import Header from './Header';
import VaultDemo from 'components/VaultDemo';

import './App.css';

const App:React.FunctionComponent = () => {
  return (
    <>
      <Header/>
      <Container maxWidth="sm">
        <VaultDemo />
      </Container>
    </>
  );
}

export default App;
