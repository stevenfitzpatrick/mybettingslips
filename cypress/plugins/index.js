// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const webpack = require('@cypress/webpack-preprocessor');

module.exports = on => {
  const options = {
    // send in the options from your webpack.config.js, so it works the same
    // as your app's code
    webpackOptions: {
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: [/node_modules/],
            use: [
              {
                loader: 'babel-loader',
                options: {
                  babelrc: false,
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns: 'usage',
                        targets: {
                          browsers: ['last 2 Chrome versions']
                        }
                      }
                    ],
                    '@babel/preset-react'
                  ],
                  plugins: [
                    require('@babel/plugin-proposal-object-rest-spread')
                  ]
                }
              }
            ]
          }
        ]
      }
    },
    watchOptions: {}
  };
  on('file:preprocessor', webpack(options));
};
