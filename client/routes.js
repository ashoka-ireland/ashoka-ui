import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'components/App';
import Home from 'components/Home';
import NotFoundPage from 'components/NotFoundPage.js';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path='*' component={NotFoundPage}/>
  </Route>
);
