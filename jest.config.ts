import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
  setupFilesAfterEnv: ["<rootDir>/.jest/setup.ts"],

  moduleDirectories: ["node_modules", "<rootDir>/"],
  transformIgnorePatterns: ["/node_modules/@uidotdev/usehooks/index.js"],
  testEnvironment: "jsdom",
  bail: true,
  logHeapUsage: true,
  testTimeout: 120000,
  forceExit: true,
  collectCoverage: true,

  coverageProvider: "v8",
  collectCoverageFrom: ["components/**/*.{js,jsx,ts,tsx}"],
};

export default createJestConfig(customJestConfig);
