import * as constants from './constants';

const app = {
  appId: constants.PROD_APP_ID,
  redirectUri: constants.PROD_REDIRECT_URI
};

const api = { endpoint: constants.PROD_API_ENDPOINT };

module.exports = () => {
  return {
    isProductionMode: true,
    app,
    api
  };
};
