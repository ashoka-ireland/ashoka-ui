import { createRequestTypes, fetchEntity, createRequestActions } from '../actions';
import client from 'api/client'; //eslint-disable-line

export const USERS_LIST = createRequestTypes('USERS_LIST');
export const USERS_SEARCH = createRequestTypes('USERS_SEARCH');
export const USER_GET = createRequestTypes('USER_GET');

export const events = {
  listUsers: createRequestActions(USERS_LIST),
  getUser: createRequestActions(USER_GET),
  searchUsers: createRequestActions(USERS_SEARCH)
};

export const actions = {
  listUsers: (params) => fetchEntity(events.listUsers, client.listUsers, params),
  searchUsers: (query) => fetchEntity(events.searchUsers, client.searchUsers, query),
  getUser: (params) => fetchEntity(events.getUser, client.getUser, params)
};
