module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/react'
  ],
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      classes: true
    },
    sourceType: 'module'
  },
  plugins: [
    'react',
    'jest',
    'import',
    'jsx-a11y',
    'prettier',
    'jsx-a11y',
    'codebox',
    'graphql'
  ],
  rules: {
    'graphql/template-strings': [
      'error',
      {
        env: 'literal',
        schemaJson: require('./schema.json')
      }
    ],
    indent: ['error', 2],
    'no-undef': 0,
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/prefer-stateless-function': [2],
    'jsx-a11y/no-autofocus': 0,
    'codebox/sort-imports': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
          ['unknown', 'absolute']
        ],
        importTypes: ['default', 'named', 'all', 'none'],
        ignoreCase: true
      }
    ],
    'codebox/sort-named-imports': [
      'error',
      {
        ignoreCase: true
      }
    ]
  }
};
