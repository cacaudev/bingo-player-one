/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};