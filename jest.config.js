/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: {
          allowJs: true,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
      },
    ],
    "^.+\\.jsx?$": "babel-jest",
  },
  testMatch: ["**/?(*.)+(spec).[jt]s?(x)"],
  collectCoverage: true,
  coverageReporters: ["json", "html"],
  maxWorkers: 1,
  workerIdleMemoryLimit: "512MB",
  forceExit: true,
  detectOpenHandles: true,
  transformIgnorePatterns: ["node_modules/(?!(nanoid)/)"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  extensionsToTreatAsEsm: [".ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testTimeout: 30000,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
