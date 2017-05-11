import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
  App,
  SurveyPage,
  NotFound,
  UsersPage
} from 'components';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SurveyPage} />
    <Route path="users" component={UsersPage} />
    <Route path="*" component={NotFound} />
  </Route>
);
