const commonPaths = require('./common-paths');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: './src/index.js',
    output: {
        path: commonPaths.outputPath,
        filename: 'bundle.js'
    },
    resolve: {
        modules: [commonPaths.nodeModules, commonPaths.src],
        extensions: ['.js', '.json', '.jsx', '.css', '.scss', '.svg']
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
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
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true
            }
        })
    ]
};

module.exports = config;
