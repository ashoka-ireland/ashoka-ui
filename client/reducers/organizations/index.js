import * as SurveyActionTypes from '../surveys/actions';
import * as NomineeActionTypes from '../nominees/actions';
import createReducer from '../createReducer';
import * as ActionTypes from './actions';
import { map, toPairs } from 'lodash';

export const organizations = createReducer([], {
  [ActionTypes.ORGANIZATION_LIST.SUCCESS]: (state, action) => {
    const organizations = toPairs(action.response);
    return map(organizations, ([key, org]) => ({
      key,
      ...org
    }));
  },
  [ActionTypes.ORGANIZATION_SEARCH.SUCCESS]: (state, action) => {
    const organizations = toPairs(action.response);
    return map(organizations, ([key, org]) => ({
      key,
      ...org
    }));
  }
});

export const organization = createReducer({}, {
  [ActionTypes.ORGANIZATION_GET.REQUEST]: () => {
    return {};
  },
  [ActionTypes.ORGANIZATION_GET.SUCCESS]: (state, action) => {
    return { ...action.response, key: action.id };
  }
});

export const nomineeOrganizations = createReducer([], {
  [NomineeActionTypes.NOMINEE_GET.REQUEST]: () => {
    return [];
  },
  [NomineeActionTypes.NOMINEE_GET.SUCCESS]: (state, action) => {
    return action.response.orgs;
  },
  [ActionTypes.NOMINEE_ORGANIZATION_SAVE.SUCCESS]: (state, action) => {
    return action.response;
  },
  [SurveyActionTypes.SURVEY_GET.SUCCESS]: (state, action) => {
    return action.response.orgs;
  }
});
