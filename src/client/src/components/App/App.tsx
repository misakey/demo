import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Container from '@material-ui/core/Container';

import Header from './Header';
import AuthCallback from './AuthCallback';
import VaultDemo from 'components/VaultDemo';
import SyncDemo from 'components/SyncDemo';

import misakeySdk from 'constants/misakeySDK';

import './App.css';


const App:React.FunctionComponent = () => {
  return (
    <>
      <Header/>
      <Container maxWidth="sm">
        <Router>
          <Switch>
            <Route path="/sync/callback" component={AuthCallback} />
            <Route path="/login" render={() => {
              misakeySdk.userConsent('antoine@misakey.com')
              return null;
            }} />
            
            <Route path="/sync" exact component={SyncDemo}/>

            <Route path="/" exact component={VaultDemo} />
            
          </Switch>

        </Router>

        
      </Container>
    </>
  );
}

export default App;
