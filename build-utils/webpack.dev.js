const commonPaths = require('./common-paths');

const config = {
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
