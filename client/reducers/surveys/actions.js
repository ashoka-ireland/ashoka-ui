import { createRequestTypes, fetchEntity, createRequestActions } from '../actions';
import client from 'api/client'; //eslint-disable-line

export const SURVEY_LIST = createRequestTypes('SURVEY_LIST');

export const events = {
  listSurveys: createRequestActions(SURVEY_LIST)
};

export const actions = {
  listSurveys: (params) => fetchEntity(events.listSurveys, client.listSurveys, params)
};
