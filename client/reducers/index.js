import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import * as userReducers from './users';
import * as nomineeReducers from './nominees';

export default combineReducers({
  routing: routerReducer,
  ...userReducers,
  ...nomineeReducers
});
