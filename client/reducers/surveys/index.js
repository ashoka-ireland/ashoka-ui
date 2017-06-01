import createReducer from '../createReducer';
import * as ActionTypes from './actions';
import { map, toPairs } from 'lodash';

export const surveys = createReducer([], {
  [ActionTypes.SURVEY_LIST.SUCCESS]: (state, action) => {
    const surveys = toPairs(action.response);
    return map(surveys, ([key, survey]) => ({
      key,
      ...survey
    }));
  },
  [ActionTypes.SURVEY_SEARCH.SUCCESS]: (state, action) => {
    const surveys = toPairs(action.response);
    return map(surveys, ([key, survey]) => ({
      key,
      ...survey
    }));
  }
});
