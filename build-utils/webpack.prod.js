const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const commonPaths = require('./common-paths');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new UglifyJsPlugin({
            sourceMap: true,
            cache: true,
            parallel: true,
            uglifyOptions: {
                output: {
                    comments: false,
                    beautify: false
                },
                compress: {
                    warnings: false,
                    comparisons: false,
                    drop_console: true,
                    ecma: 8
                },
                mangle: {
                    eval: false
                },
                warnings: false
            }
        }),
        //Add Bundle JS Analyzer
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: true,
            generateStatsFile: false
        })
    ],
    devtool: ''
};

module.exports = config;
