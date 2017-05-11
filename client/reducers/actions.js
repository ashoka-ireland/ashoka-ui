
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export const createRequestTypes = (base) => {
  const res = {};
  //eslint-disable-next-line
  [REQUEST, SUCCESS, FAILURE].forEach(type => res[type] = `${base}_${type}`);
  return res;
};

export const action = (type, body) => {
  const payload = body || {};
  return { type, ...payload };
};

// resuable fetch Subroutine
// entity : topic | ...
// apiFn  : api.fetchUser | api.fetchRepo | ...
// args   : api arguments
export function fetchEntity(entity, apiFn, args) {
  return async (dispatch) => {
    dispatch(entity.request(args));
    const { response, error } = await apiFn(args);
    if (response) {
      dispatch(entity.success(args, response));
    } else {
      dispatch(entity.failure(args, error));
    }
  };
}
