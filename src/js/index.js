import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';

const rootEl = document.getElementById('app');
ReactDOM.render(
  <AppContainer>
    <Main />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./main', () => {
    const NextMain = require('./main').default;
    ReactDOM.render(
      <AppContainer>
         <NextMain />
      </AppContainer>,
      rootEl
    );
  });
}
