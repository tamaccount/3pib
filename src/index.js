import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

// import App from './App';
import AnnotateUploadedFile from './pages/AnnotateUploadedFile';
import Home from './pages/Home';
import UploadFile from './pages/UploadFile';
import CreateDocument from './apps/CreateDocument';
import App from './apps/index';
import Share from './pages/Share';

import configureStore from './utils/configureStore';

import './index.css';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#265DB4',
    },
    secondary: {
      main: '#EFD348',
    },
  },
  overrides: {
    MuiInputLabel: {
      containedSecondary: {
        color: "black"
      }
    },
  }
});

ReactDOM.render(
  <Provider store={configureStore()}>
    <ThemeProvider theme={theme}>
      {/*<AnnotateUploadedFile />*/}
      <App />
      {/*<UploadFile />*/}
    {/*  <Share />*/}
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
