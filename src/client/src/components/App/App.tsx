import React from 'react';
import Header from './Header';
import VaultDemo from '../VaultDemo';
import Container from '@material-ui/core/Container';

import './App.css';

const App:React.FunctionComponent = () => {
  return (
    <>
      <Header/>
      <Container maxWidth="md">
        <VaultDemo />
      </Container>
    </>
  );
}

export default App;
