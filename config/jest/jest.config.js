const PACKAGE = require('../../package.json');

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/index.js'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/config/',
    '<rootDir>/flow-typed/'
  ],
  coverageDirectory: '<rootDir>/coverage',
  globals: {
    __AUTH0_CLIENT_ID__: '__MISSING__',
    __AUTH0_DOMAIN__: '__MISSING__',
    __ENV_DEV__: false,
    __ENV_PROD__: false,
    __ENV_TEST__: true,
    __PACKAGE__: PACKAGE.name,
    __VERSION__: PACKAGE.version
  },
  rootDir: '../..',
  setupFiles: [
    '<rootDir>/config/jest/polyfill.rAF.js',
    '<rootDir>/config/jest/enzyme.config.js'
  ],
  testEnvironment: '<rootDir>/config/jest/jsdom.config.js',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/jest/assetsTransformer.js',
  },
};
