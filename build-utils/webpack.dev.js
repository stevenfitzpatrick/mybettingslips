const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');

const pkg = require('../package.json');
const commonPaths = require('./common');

const config = {
  mode: 'development',
  output: {
    filename: '[name].bundle.[hash].js',
    chunkFilename: '[name].bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,

        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.module\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              camelCase: 'dashes',
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  serve: {
    add: app => {
      app.use(convert(history()));
    },
    hot: false,
    open: false
  },
  cache: true,
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      filename: 'index.html',
      template: `${commonPaths.public}/index.ejs`,
      inject: true,
      cache: false,
      buildVersion: pkg.version
    }),
    new ErrorOverlayPlugin()
  ]
};

module.exports = config;
