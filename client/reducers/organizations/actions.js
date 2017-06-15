import { createRequestTypes, fetchEntity, createRequestActions } from '../actions';
import client from 'api/client'; //eslint-disable-line

export const ORGANIZATION_LIST = createRequestTypes('ORGANIZATIONS_LIST');
export const ORGANIZATION_GET = createRequestTypes('ORGANIZATIONS_GET');
export const ORGANIZATION_SEARCH = createRequestTypes('ORGANIZATION_SEARCH');
export const NOMINEE_ORGANIZATION_SAVE = createRequestTypes('NOMINEE_ORGANIZATION_SAVE');

export const events = {
  listOrganizations: createRequestActions(ORGANIZATION_LIST),
  getOrganization: createRequestActions(ORGANIZATION_GET),
  searchOrganizations: createRequestActions(ORGANIZATION_SEARCH),
  saveNomineeOrganizations: createRequestActions(NOMINEE_ORGANIZATION_SAVE)
};

export const actions = {
  listOrganizations: (params) => fetchEntity(events.listOrganizations, client.listOrganizations, params),
  getOrganization: (params) => fetchEntity(events.getOrganization, client.getOrganization, params),
  searchOrganizations: (query) => fetchEntity(events.searchOrganizations, client.searchOrganizations, query),
  saveNomineeOrganizations: (params) => fetchEntity(events.saveNomineeOrganizations, client.saveNomineeOrganizations, params)
};
