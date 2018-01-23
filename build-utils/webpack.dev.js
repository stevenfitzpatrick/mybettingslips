const webpack = require('webpack');

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
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ]
};

module.exports = config;
