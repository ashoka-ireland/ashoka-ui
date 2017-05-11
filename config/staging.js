import * as constants from './constants';

const app = {
  appId: constants.STAGING_APP_ID,
  redirectUri: constants.STAGING_REDIRECT_URI
};

const api = { endpoint: constants.STAGING_API_ENDPOINT };

module.exports = () => {
  return {
    isProductionMode: true,
    app,
    api
  };
};
