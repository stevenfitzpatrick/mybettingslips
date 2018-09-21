const { NODE_ENV = 'production' } = process.env;

const modules = NODE_ENV === 'test' ? 'commonjs' : false;
const loose = true;

const envPlugins = {
  development: ['react-hot-loader/babel'],
  production: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: true
      }
    ],
    'transform-react-remove-prop-types'
  ],
  test: []
};

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules,
        loose,
        targets: {
          browsers: ['last 2 Chrome versions']
        }
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose }],
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    'babel-plugin-styled-components',
    ...envPlugins[NODE_ENV],
    '@babel/plugin-proposal-optional-chaining'
  ].filter(Boolean)

  // "plugins": [
  //   "@babel/transform-react-constant-elements",
  //   "@babel/transform-react-inline-elements",
  //   "transform-react-pure-class-to-function",

  //   "@babel/transform-runtime",
  //   ["babel-plugin-root-import", {
  //     "rootPathSuffix": "."
  //   }]
};
