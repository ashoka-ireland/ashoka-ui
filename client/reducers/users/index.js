import createReducer from '../createReducer';
import * as ActionTypes from './actions';
import { map, toPairs } from 'lodash';

export const usersPage = createReducer([], {
  [ActionTypes.USERS_LIST.SUCCESS]: (state, action) => {
    const users = toPairs(action.response);
    return map(users, ([key, user]) => ({
      key,
      ...user
    }));
  }
});
