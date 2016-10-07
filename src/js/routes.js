import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import horizon from './utils/horizon';

import App from './containers/App';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import Register from './containers/Register';
import Auth from './containers/Auth';
import UserHome from './containers/UserHome';

function requireAuth(nextState, replace) {
  if (!horizon.hasAuthToken()) {
    replace("/");
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="login" component={Login} />
    <Route path="404" component={NotFound} />

    <Route component={Auth} onEnter={requireAuth}>
      <Route path="users/:userId" component={UserHome} />
    </Route>
    <Redirect from="*" to="404" />
  </Route>
);
