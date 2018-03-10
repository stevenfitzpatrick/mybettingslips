const commonPaths = require('./common');

const config = {
    entry: './src',
    output: {
        path: commonPaths.outputPath,
        publicPath: '/'
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
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: []
};

module.exports = config;
