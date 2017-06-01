import { createRequestTypes, fetchEntity, createRequestActions } from '../actions';
import client from 'api/client'; //eslint-disable-line

export const NOMINEES_LIST = createRequestTypes('NOMINEES_LIST');
export const NOMINEES_SEARCH = createRequestTypes('NOMINEES_SEARCH');
export const NOMINEE_GET = createRequestTypes('NOMINEE_GET');

export const events = {
  listNominees: createRequestActions(NOMINEES_LIST),
  getNominee: createRequestActions(NOMINEE_GET),
  searchNominees: createRequestActions(NOMINEES_SEARCH)
};

export const actions = {
  listNominees: (params) => fetchEntity(events.listNominees, client.listNominees, params),
  searchNominees: (query) => fetchEntity(events.searchNominees, client.searchNominees, query),
  getNominee: (params) => fetchEntity(events.getNominee, client.getNominee, params)
};
