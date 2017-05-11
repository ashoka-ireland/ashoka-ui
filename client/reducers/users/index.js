import createReducer from '../createReducer';
import * as ActionTypes from './actions';

export const usersPage = createReducer({}, {
  [ActionTypes.USERS_LIST.SUCCESS]: (state, action) => {
    return action.response;
  }
});
