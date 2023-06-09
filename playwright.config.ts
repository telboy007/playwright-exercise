// playwright.config.ts
// @ts-check

import type { PlaywrightTestConfig } from '@playwright/test';

// Use dotenv at entry point
import 'dotenv/config'

const config: PlaywrightTestConfig = {
  // Options shared for all projects.
  timeout: 60000,
  workers: 2,
  fullyParallel: true,
  reportSlowTests: null,
  reporter: [
    ['github'],
    ['junit', { outputFile: './output/junit/results.xml' }],
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