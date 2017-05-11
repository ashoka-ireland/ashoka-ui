import { createRequestTypes, action, fetchEntity } from '../actions';
import client from 'api/client';

export const USERS_LIST = createRequestTypes('USERS_LIST');

export const events = {
  listUsers: {
    request: (id) => action(USERS_LIST.REQUEST, { id }),
    success: (id, response) => action(USERS_LIST.SUCCESS, { id, response }),
    failure: (id, error) => action(USERS_LIST.FAILURE, { id, error })
  }
};

export const actions = {
  listUsers: (params) => fetchEntity(events.listUsers, client.listUsers, params)
};
