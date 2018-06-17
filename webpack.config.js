const webpackMerge = require('webpack-merge');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const commonConfig = require('./build-utils/webpack.common');

const smp = new SpeedMeasurePlugin();

module.exports = env => {
  const target = typeof env === 'object' ? env.env : env;
  const envConfig = require(`./build-utils/webpack.${target}.js`);
  return smp.wrap(webpackMerge(commonConfig, envConfig));
};
