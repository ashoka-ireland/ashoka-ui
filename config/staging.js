import * as constants from './constants';

const app = {
  appId: constants.STAGING_APP_ID,
  redirectUri: constants.STAGING_REDIRECT_URI,
  bucketName: constants.CREDENTIALS_BUCKET_NAME
};

const api = { endpoint: constants.STAGING_API_ENDPOINT };

module.exports = () => {
  return {
    isProductionMode: true,
    app,
    api
  };
};
