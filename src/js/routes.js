import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import horizon from './utils/horizon';

import App from './components/App';
import HomeView from './views/HomeView';
import NotFoundView from './views/NotFoundView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import AuthView from './views/AuthView';
import UserHomeView from './views/UserHomeView';

function requireAuth(nextState, replace) {
  if (!horizon.hasAuthToken()) {
    replace("/");
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeView} />
    <Route path="login" component={LoginView} />
    <Route path="404" component={NotFoundView} />

    <Route component={AuthView} onEnter={requireAuth}>
      <Route path="users/:userId" component={UserHomeView} />
    </Route>
    <Redirect from="*" to="404" />
  </Route>
);
