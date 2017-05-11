import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import * as userReducers from './users';

export default combineReducers({
  routing: routerReducer,
  ...userReducers
});
