module.exports = {
  testEnvironment: 'node', // Use node environment for server tests
  testMatch: ['**/tests/**/*.test.js', '**/tests/**/*.test.jsx'],
  setupFilesAfterEnv: ['./jest.setup.js'], // Ensure jest.setup.js is loaded
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!bson|@noble|@paralleldrive|formidable|superagent|mongodb-memory-server).+\\.js$',
  ],
  moduleNameMapper: {
    "^react$": "<rootDir>/client/node_modules/react",
    "^react-dom$": "<rootDir>/client/node_modules/react-dom"
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  globals: {
    'babel-jest': {
      useESM: false,
    },
  },
};
