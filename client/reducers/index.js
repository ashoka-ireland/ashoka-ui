import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import * as nomineeReducers from './nominees';
import * as organizationReducers from './organizations';
import * as surveyReducers from './surveys';

export default combineReducers({
  routing: routerReducer,
  ...nomineeReducers,
  ...organizationReducers,
  ...surveyReducers
});
