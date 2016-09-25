import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import { persistState } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import routes from '../routes';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

const loggerMiddleware = createLogger();

const store = configureStore();

function configureStore(initialState) {

  let middlewares = [
    thunkMiddleware,
    loggerMiddleware,
    routerMiddleware(browserHistory),
  ];
  let enhancer;

  if (process.env.NODE_ENV !== 'production') {

    middlewares.push(require('redux-immutable-state-invariant')());

    let getDebugSessionKey = function () {
      // By default we try to read the key from ?debug_session=<key> in the address bar
      const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
      return (matches && matches.length) ? matches[1] : null;
    };

    enhancer = compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ?
        window.devToolsExtension() :
        require('../utils/DevTools').default.instrument(),

      // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
      persistState(getDebugSessionKey())
    );
  } else {
    enhancer = applyMiddleware(...middlewares);
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
