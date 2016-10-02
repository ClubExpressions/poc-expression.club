import '../styles/styles.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './utils/store';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

let ComponentEl;

if (process.env.NODE_ENV !== 'production') {
  const DevTools = require('./utils/DevTools').default;

  // If using routes
  ComponentEl = (
    <div>
      <Router history={history} routes={routes} />
      <DevTools />
    </div>
  );
} else {
  ComponentEl = (
    <div>
      <Router history={history} routes={routes} />
    </div>
  );
}

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
          {ComponentEl}
      </Provider>
    );
  }
}
