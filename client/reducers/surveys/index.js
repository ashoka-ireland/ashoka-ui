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

const DefaultSurvey = {
  title: 'Ashoka Changemaker Questionnaire',
  showProgressBar: 'top',
  pages: []
};

export const profile = createReducer({}, {
  [ActionTypes.SURVEY_GET.SUCCESS]: (state, action) => {
    return action.response;
  }
});

export const survey = createReducer(DefaultSurvey, {
  [ActionTypes.SURVEY_MODEL_LOAD.SUCCESS]: (state, action) => {
    return action.response;
  }
});
