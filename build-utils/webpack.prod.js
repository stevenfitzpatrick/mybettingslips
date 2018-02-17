const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;

const config = {
    mode: 'production',
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
    //Add Bundle JS Analyzer
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: true,
            generateStatsFile: false
        })
    ]
};

module.exports = config;
