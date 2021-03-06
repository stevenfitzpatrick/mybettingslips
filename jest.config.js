module.exports = {
  testMatch: ['<rootDir>/src/**/?(*)(Test).js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '^.+\\.module\\.scss$': 'identity-obj-proxy'
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|json)$',
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
  moduleDirectories: ['node_modules', '<rootDir>/tests/utils/'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'graphql'],
  modulePaths: ['<rootDir>/src/client'],
  setupFiles: ['<rootDir>/tests/localStorage.js'],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/tests/init.js'],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 80
    }
  }
};
