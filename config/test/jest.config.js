module.exports = {
  globals: {
    __AUTH0_CLIENT_ID__: 'not_set',
    __AUTH0_DOMAIN__: 'not_set'
  },
  rootDir: '../..',
  setupFiles: [
    '<rootDir>/config/test/polyfill.rAF.js',
    '<rootDir>/config/test/enzyme.config.js'
  ]
};
