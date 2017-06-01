import createReducer from '../createReducer';
import * as ActionTypes from './actions';
import { map, toPairs } from 'lodash';

export const nomineesPage = createReducer([], {
  [ActionTypes.NOMINEES_LIST.SUCCESS]: (state, action) => {
    const nominees = toPairs(action.response);
    return map(nominees, ([key, nominee]) => ({
      key,
      name: `${nominee.firstName} ${nominee.lastName}`,
      ...nominee
    }));
  }
});

export const nomineesSearchResults = createReducer([], {
  [ActionTypes.NOMINEES_SEARCH.SUCCESS]: (state, action) => {
    const nominees = toPairs(action.response);
    return map(nominees, ([key, nominee]) => ({
      key,
      name: `${nominee.firstName} ${nominee.lastName}`,
      ...nominee
    }));
  }
});

export const nominee = createReducer({ status: 'draft' }, {
  [ActionTypes.NOMINEE_GET.REQUEST]: () => {
    return {};
  },
  [ActionTypes.NOMINEE_GET.SUCCESS]: (state, action) => {
    return { ...action.response, key: action.id };
  }
});
