const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { PostCSSConfig } = require('./common');

const config = {
    mode: 'production',
    output: {
        filename: '[name].bundle.[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /\.module\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: PostCSSConfig
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
                                minimize: true,
                                camelCase: 'dashes',
                                modules: true,
                                localIdentName: '[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: PostCSSConfig
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
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css'
        }),
        //Add Bundle JS Analyzer
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: true,
            generateStatsFile: false
        })
    ],
    optimization: {
        runtimeChunk: false,
        splitChunks: {
            chunks: 'all', //Taken from https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693,
            filename: '[name].async.[chunkhash].js'
        }
    }
};

module.exports = config;
