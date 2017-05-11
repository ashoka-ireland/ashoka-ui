import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
  App,
  SurveyPage,
  NotFound,
  UsersPage,
  LoginPage
} from 'components';

const isAuthenticated = () => {};

export default (
  <div>
    <Route path="/login" component={LoginPage} />
    <Route path="/" component={App} onEnter={isAuthenticated}>
      <IndexRoute component={SurveyPage} />
      <Route path="users" component={UsersPage} />
      <Route path="*" component={NotFound} />
    </Route>
  </div>
);
