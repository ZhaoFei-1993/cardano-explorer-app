module.exports = {
  globals: {
    'ts-jest': {
      babelConfig: '<rootDir>/.babelrc'
    }
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx', 'node', 'graphql'],
  preset: 'ts-jest',
  roots: [
    '<rootDir>/source'
  ],
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['./source/config/jest.config.ts'],
  transform: {
    '\\.graphql$': 'jest-transform-graphql',
    '\\.spec.ts?$': 'ts-jest'
  },
};
