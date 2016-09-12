import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './components/App';
import HomeView from './views/HomeView';
import NotFoundView from './views/NotFoundView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeView} />
    <Route path="login" component={LoginView} />
    <Route path="404" component={NotFoundView} />

    <Route component={HomeView}>
      <Route path="users/:userId/register" component={RegisterView} />
    </Route>
    <Redirect from="*" to="404" />
  </Route>
);
