const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pkg = require('../package.json');
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
                                localIdentName: 'bs_[hash:base64:3]'
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
            },
            buildVersion: pkg.version
        }),
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css'
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        //Add Bundle JS Analyzer
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
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
