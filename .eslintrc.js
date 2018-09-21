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
    'plugin:react/all',
    'prettier',
    'prettier/react'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
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
    indent: ['error', 2],
    'no-undef': 0,
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    'react/prefer-stateless-function': [2],
    'react/display-name': 0,
    'react/jsx-no-literals': 0,
    'react/forbid-prop-types': 0,
    'jsx-a11y/no-autofocus': 0,
    'react/require-optimization': 0,
    'react/jsx-no-bind': 0,
    'react/prefer-stateless-function': 1,
    'react/jsx-max-depth': 0,
    'react/jsx-filename-extension': 0,
    'react/forbid-component-props': 0,
    'react/destructuring-assignment': 0,
    'react/no-set-state': 0,
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
  },
  settings: {
    'import/resolver': {
      jest: {
        jestConfigFile: './jest.config.js'
      }
    },
    react: {
      pragma: 'React',
      version: '16.5.1'
    }
  }
};
