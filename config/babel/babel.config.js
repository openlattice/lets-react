module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-runtime',
    'babel-plugin-styled-components',
    ['babel-plugin-transform-imports', {
      '@fortawesome/pro-duotone-svg-icons': {
        preventFullImport: true,
        skipDefaultConversion: true,
        transform: (importName) => `@fortawesome/pro-duotone-svg-icons/${importName}`,
      },
      '@fortawesome/pro-light-svg-icons': {
        preventFullImport: true,
        skipDefaultConversion: true,
        transform: (importName) => `@fortawesome/pro-light-svg-icons/${importName}`,
      },
      '@fortawesome/pro-regular-svg-icons': {
        preventFullImport: true,
        skipDefaultConversion: true,
        transform: (importName) => `@fortawesome/pro-regular-svg-icons/${importName}`,
      },
      '@fortawesome/pro-solid-svg-icons': {
        preventFullImport: true,
        skipDefaultConversion: true,
        transform: (importName) => `@fortawesome/pro-solid-svg-icons/${importName}`,
      },
    }]
  ],
  presets: [
    '@babel/preset-env',
    '@babel/preset-flow',
    '@babel/preset-react',
  ],
};
