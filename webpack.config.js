const webpackMerge = require('webpack-merge');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const commonConfig = require('./build-utils/webpack.common');

const smp = new SpeedMeasurePlugin();

module.exports = env => {
  const envConfig = require(`./build-utils/webpack.${env}.js`);
  return smp.wrap(webpackMerge(commonConfig, envConfig));
};
