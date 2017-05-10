process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';

const ALL = 0;
const FUNCTIONAL = 1;
const UNIT = 2;

const testGlob = {
  [ALL]: 'spec/all.js',
  [FUNCTIONAL]: 'spec/functional/all.js',
  [UNIT]: 'spec/unit/all.js',
};

let testToRun = ALL;

if(process.env.npm_config_unit) testToRun += UNIT;
if(process.env.npm_config_functional) testToRun += FUNCTIONAL;

testToRun %= 3;

const files = process.env.npm_config_single_file
  ? process.env.npm_config_single_file
  : testGlob[testToRun];

const webpackConfig = require('./webpack.config');

module.exports = function(config) {
  const options = {
    autoWatch: true,
    basePath: './client',
    browsers: ['Chrome'],
    colors: true,
    concurrency: Infinity,
    files: [{
      pattern: files,
      watch: false,
    }],

    singleRun: false,

    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],
    logLevel: config.LOG_ERROR,
    port: 9876,
    reporters: ['progress'],
    client: {
      mocha: {
        reporter: 'html'
      }
    },

    webpack: {
      devtool: 'inline-source-map',
      resolve: webpackConfig.resolve,
      module: webpackConfig.module,
      externals: {
        'jsdom': 'window',
        'jsdom-global/register': 'window',
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window'
      }
    },

    webpackMiddleware: {
      stats: 'errors-only'
    }
  };

  options.preprocessors = {},
  options.preprocessors[files] = ['webpack', 'sourcemap'];

  config.set(options);
};
