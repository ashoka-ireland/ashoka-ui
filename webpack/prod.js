import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const baseConfig = require('./base');

let config = Object.assign({}, baseConfig);

config.entry = ['babel-polyfill', path.resolve(__dirname, '../client/index.js')];
config.devtool = 'source-map';

config.output.filename = '[name].[chunkhash].js';

config.plugins = [
  ...baseConfig.plugins,
  // Hash the files using MD5 so that their names change when the content changes.
  new WebpackMd5Hash(),

  // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: false
  }),

  // Generate an external css file with a hash in the filename
  new ExtractTextPlugin({
    filename: '[name].[contenthash].css'
  }),

  // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
  new HtmlWebpackPlugin({
    template: 'client/index.ejs',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    },
    inject: true,
    // Note that you can add custom options here if you need to handle other custom logic in index.html
    // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
    trackJSToken: ''
  }),

  // Eliminate duplicate packages when generating bundle
  new webpack.optimize.DedupePlugin(),

  // Minify JS
  new webpack.optimize.UglifyJsPlugin()
];

export default config;
