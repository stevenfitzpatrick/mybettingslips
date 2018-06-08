const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pkg = require('../package.json');
const commonPaths = require('./common');

const config = {
  mode: 'production',
  output: {
    filename: '[name].bundle.[chunkhash].js'
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all' //Taken from https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693,
    },
    nodeEnv: 'production',
    minimize: true,
    concatenateModules: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: commonPaths.PostCSSConfig
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.module\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              minimize: true,
              camelCase: 'dashes',
              modules: true,
              localIdentName: 'bs_[hash:base64:3]'
            }
          },
          {
            loader: 'postcss-loader',
            options: commonPaths.PostCSSConfig
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      filename: 'index.html',
      template: `${commonPaths.public}/index.ejs`,
      inject: true,
      prefetch: false,
      minify: {
        removeComments: false,
        collapseWhitespace: true,
        minifyJS: true
      },
      buildVersion: pkg.version
    }),
    //TODO: Change to content hash when available
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    // new ScriptExtHtmlWebpackPlugin({
    //   defaultAttribute: 'defer'
    // }),
    //Add Bundle JS Analyzer
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
      generateStatsFile: false,
      reportFilename: path.join(commonPaths.report, 'report.html')
    })
  ]
};

module.exports = config;
