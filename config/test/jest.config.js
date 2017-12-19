const PACKAGE = require('../../package.json');

module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/config/',
    '<rootDir>/flow-typed/'
  ],
  coverageDirectory: '<rootDir>/coverage',
  globals: {
    __AUTH0_CLIENT_ID__: 'not_set',
    __AUTH0_DOMAIN__: 'not_set',
    __VERSION__: PACKAGE.version
  },
  rootDir: '../..',
  setupFiles: [
    '<rootDir>/config/test/polyfill.rAF.js',
    '<rootDir>/config/test/enzyme.config.js'
  ]
};
