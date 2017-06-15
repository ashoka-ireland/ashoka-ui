import { createRequestTypes, fetchEntity, createRequestActions } from '../actions';
import client from 'api/client'; //eslint-disable-line

export const SURVEY_GET = createRequestTypes('SURVEY_GET');
export const SURVEY_SAVE = createRequestTypes('SURVEY_SAVE');
export const SURVEY_LIST = createRequestTypes('SURVEY_LIST');
export const SURVEY_SEARCH = createRequestTypes('SURVEY_SEARCH');
export const SURVEY_MODEL_LOAD = createRequestTypes('SURVEY_MODEL_LOAD');
export const SURVEY_ORG_MODEL_LOAD = createRequestTypes('SURVEY_ORG_MODEL_LOAD');

export const events = {
  getProfile: createRequestActions(SURVEY_GET),
  saveSurvey: createRequestActions(SURVEY_SAVE),
  listSurveys: createRequestActions(SURVEY_LIST),
  searchSurveys: createRequestActions(SURVEY_SEARCH),
  loadSurveyModel: createRequestActions(SURVEY_MODEL_LOAD),
  loadSurveyOrgModel: createRequestActions(SURVEY_ORG_MODEL_LOAD)
};

export const actions = {
  getProfile: (params) => fetchEntity(events.getProfile, client.getProfile, params),
  saveSurvey: (params) => fetchEntity(events.saveSurvey, client.saveSurvey, params),
  listSurveys: (params) => fetchEntity(events.listSurveys, client.listSurveys, params),
  searchSurveys: (params) => fetchEntity(events.searchSurveys, client.searchSurveys, params),
  loadSurveyModel: (params) => fetchEntity(events.loadSurveyModel, client.loadSurveyModel, params),
  loadSurveyOrgModel: (params) => fetchEntity(events.loadSurveyOrgModel, client.loadSurveyOrgModel, params),
};
