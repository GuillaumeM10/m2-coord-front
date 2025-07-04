import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@environments/(.*)$': '<rootDir>/src/environments/$1',
    '^@mocks/(.*)$': '<rootDir>/src/mocks/$1',
  },
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/main.ts',
    '!src/test.ts',
    '!src/main.server.ts',
    '!src/environments/**',
    '!src/**/*.module.ts',
    '!src/**/*.routing.ts',
    '!src/**/mocks/**',
  ],
  coveragePathIgnorePatterns: [
    'src/server.ts',
    'src/app/app.*.server.ts',
    'src/app/app.routes.ts',
    'src/app/app.config.ts',
    '/node_modules/',
    'src/main.ts',
    'src/test.ts',
    'src/main.server.ts',
    'src/environments/',
    'src/.*\\.module\\.ts$',
    'src/.*\\.routing\\.ts$',
    'src/.*/mocks/.*',
  ],
};

export default config;
