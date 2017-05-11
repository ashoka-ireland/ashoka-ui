import * as constants from './constants';

const jsonServerPort = 3001;

const getConfig = (host, port) => {
  const devServer = { host, port: (port + 1) || 8081 };
  const api = {
    endpoint: process.env.npm_config_with_mock_api
      ? `http://${host}:${jsonServerPort}`
      : constants.STAGING_API_ENDPOINT
  };
  const assets = { publicPath: `//${devServer.host}:3000/dist/` };
  const app = {
    appId: constants.STAGING_APP_ID,
    redirectUri: constants.STAGING_REDIRECT_URI
  };

  return {
    isProductionMode: false,
    devServer,
    assets,
    app,
    api
  };
};

module.exports = getConfig;
