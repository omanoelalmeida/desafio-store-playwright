import {
  defineConfig,
  devices,
} from '@playwright/test';

import {
  defineBddConfig,
} from 'playwright-bdd';

import 'dotenv/config';

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: 'features/steps/**/*.ts',
  outputDir: '.features-gen',
});

export default defineConfig({
  testDir,

  timeout: 30_000,

  expect: {
    timeout: 15_000,
  },

  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'playwright-report-bdd',
        open: 'never',
      },
    ],
  ],

  use: {
    baseURL:
      process.env.BASE_URL ??
      'https://www.demoblaze.com',

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});