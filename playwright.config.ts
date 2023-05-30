// playwright.config.ts
// @ts-check

import type { PlaywrightTestConfig } from '@playwright/test';

// Use dotenv at entry point
require('dotenv').config();

const path = require('path');
const resultsDir = path.resolve('./', 'output');

const config: PlaywrightTestConfig = {
  // Options shared for all projects.
  timeout: 30000,
  workers: 1,
  reportSlowTests: null,
  reporter: [
    ['github'],
    ['junit', { outputFile: `${resultsDir}/junit/results.xml` }],
  ],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    contextOptions: {
      recordVideo: {
        dir: 'test-results/',
      },
    },
  },
  // Project definitions
  projects: [
    {
      name: 'chromium',
      metadata: {},
      testMatch: ['**/chromium/*'],
      use: {
        browserName: 'chromium',
        viewport: { width: 1600, height: 900 },
        baseURL: process.env.BASE_URL,
      },
    },
    {
      name: 'firefox',
      metadata: {},
      testMatch: ['**/firefox/*'],
      use: {
        browserName: 'firefox',
        viewport: { width: 1600, height: 900 },
        baseURL: process.env.BASE_URL,
      },
    },
  ],
};

export default config;