/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  },
  transformIgnorePatterns: ['node_modules/(?!normalize-url)'],
  verbose: true
};
