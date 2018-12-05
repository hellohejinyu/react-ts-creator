module.exports = {
  "globals": {
    "NODE_ENV": "test"
  },
  "moduleNameMapper": {
    "^src(.*)$": "<rootDir>/src$1",
    "\\.(jpg|png|gif|eot|otf|svg|ttf|woff|woff2|mp4)$": "<rootDir>/jest/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "<rootDir>/jest/__mocks__/styleMock.js"
  },
  "verbose": true,
  "transform": {
    "^.+\\.jsx?$": "babel-jest",
  },
  "setupTestFrameworkScriptFile": '<rootDir>/jest/setup.js',
  "preset": 'ts-jest',
};