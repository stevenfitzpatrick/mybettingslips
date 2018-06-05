module.exports = {
  testMatch: ['<rootDir>/src/**/?(*)(Test).js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '^.+\\.module\\.scss$': 'identity-obj-proxy'
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$',
    '^.+\\.module\\.scss$'
  ],
  transform: {
    '\\.(gql|graphql)$': 'jest-transform-graphql',
    '.*': 'babel-jest'
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'graphql'],
  setupFiles: ['<rootDir>/tests/localStorage.js'],
  setupTestFrameworkScriptFile: '<rootDir>/tests/init.js',
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 80
    }
  }
};
