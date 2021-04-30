import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import 'typeface-roboto';
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './constants/theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
