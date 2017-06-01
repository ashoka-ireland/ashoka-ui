import { createRequestTypes, fetchEntity, createRequestActions } from '../actions';
import client from 'api/client'; //eslint-disable-line

export const SURVEY_LIST = createRequestTypes('SURVEY_LIST');
export const SURVEY_SEARCH = createRequestTypes('SURVEY_SEARCH');

export const events = {
  listSurveys: createRequestActions(SURVEY_LIST),
  searchSurveys: createRequestActions(SURVEY_SEARCH)
};

export const actions = {
  listSurveys: (params) => fetchEntity(events.listSurveys, client.listSurveys, params),
  searchSurveys: (params) => fetchEntity(events.searchSurveys, client.searchSurveys, params)
};
