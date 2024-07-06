import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  verbose: true,
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  silent: true
};

export default config;