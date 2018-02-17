const webpack = require('webpack');

const commonPaths = require('./common-paths');

const config = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: commonPaths.outputPath,
        compress: true,
        port: 9000,
        publicPath: '/',
        open: true,
        historyApiFallback: true
    }
};

module.exports = config;
