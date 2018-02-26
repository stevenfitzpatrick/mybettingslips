const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { PostCSSConfig } = require('./common');

const config = {
    mode: 'production',
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
    // new UglifyJsPlugin({
    //     sourceMap: true,
    //     cache: true,
    //     parallel: true,
    //     uglifyOptions: {
    //         output: {
    //             comments: false,
    //             beautify: false
    //         },
    //         compress: {
    //             warnings: false,
    //             comparisons: false,
    //             drop_console: true,
    //             ecma: 8
    //         },
    //         mangle: {
    //             eval: false
    //         },
    //         warnings: false
    //     }
    // }),
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css'
        }),
        //Add Bundle JS Analyzer
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: true,
            generateStatsFile: false
        })
    ]
};

module.exports = config;
