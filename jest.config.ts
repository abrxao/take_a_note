import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["<rootDir>/.jest/setup.ts"],

  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jsdom",
  bail: true,
  logHeapUsage: true,
  testTimeout: 120000,
  forceExit: true,
  collectCoverage: true,
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  coverageProvider: "v8",
  collectCoverageFrom: ["components/**/*.{js,jsx,ts,tsx}"],
  coveragePathIgnorePatterns: ["components/ui"],
};

export default createJestConfig(customJestConfig);
