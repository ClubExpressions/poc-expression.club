import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import { persistState } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import routes from '../routes';
import {reduxReactRouter} from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';

const loggerMiddleware = createLogger();

const store = configureStore();

function configureStore(initialState) {

  let middlewares = [
    thunkMiddleware,
    loggerMiddleware
  ];
  let enhancer;

  if (process.env.NODE_ENV !== 'production') {

    let middlewareReduxImmutableStateInvariant = require('redux-immutable-state-invariant')();
    let middleware = applyMiddleware(...middlewares, middlewareReduxImmutableStateInvariant);

    let getDebugSessionKey = function () {
      // By default we try to read the key from ?debug_session=<key> in the address bar
      const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
      return (matches && matches.length) ? matches[1] : null;
    };

    enhancer = compose(

      // Middleware we want to use in development
      middleware,
      reduxReactRouter({routes, createHistory}),
      window.devToolsExtension ?
        window.devToolsExtension() :
        require('../utils/DevTools').default.instrument(),

      // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
      persistState(getDebugSessionKey())
    );
  } else {
    enhancer = compose(applyMiddleware(...middlewares), reduxReactRouter({routes, createHistory}));
  }

  const store = createStore(rootReducer, initialState, enhancer);

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}

export default store;
