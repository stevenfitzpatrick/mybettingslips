const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonPaths = require('./common');

const config = {
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: commonPaths.PostCSSConfig
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.module\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                                camelCase: 'dashes',
                                modules: true,
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: commonPaths.PostCSSConfig
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    devServer: {
        contentBase: commonPaths.outputPath,
        compress: true,
        port: 9000,
        publicPath: '/',
        open: true,
        historyApiFallback: true
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css'
        })
    ]
};

module.exports = config;
