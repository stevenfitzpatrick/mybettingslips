const webpackMerge = require('webpack-merge');

const commonConfig = require('./build-utils/webpack.common');

module.exports = env => {
  const target = process.env.WEBPACK_SERVE ? 'dev' : env;
  const envConfig = require(`./build-utils/webpack.${target}.js`);
  return webpackMerge(commonConfig, envConfig);
};
