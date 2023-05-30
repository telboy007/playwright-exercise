import { test, TestInfo } from '@playwright/test';
import { GoogleSearchPage } from '../../pages/search';

// Use dotenv at entry point
require('dotenv').config();

const path = require('path'); 

test.beforeEach(async ({ page }, testInfo: TestInfo) => {
  // navigate to base url
  await page.goto(`${process.env.BASE_URL}`);

  // listen for console errors
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      // eslint-disable-next-line no-console
      console.log(`${testInfo.title}:${testInfo.line} ${msg.text()}`);
    }
  });
});  

test.afterEach(async ({ page }, testInfo: TestInfo) => {
  const video = page.video();
  if (video) {
    if (testInfo.status !== testInfo.expectedStatus) {
      const { title } = testInfo;
      // if blank title then leave original video
      if (title) {
        const videoFileName = testInfo.title.replace(/ /g, '-');
        video.saveAs(`${testInfo.outputDir}/${videoFileName}.webm`);
        await page.close();
        video.delete();
      }
    } else {
      await page.close();
      video.delete();
    }
  }
});

test('search', async ({ page }) => {
  const testData = 'Playwright'
  let googleSearchPage = new GoogleSearchPage(page);

  await googleSearchPage.clearDisclaimer();
  await googleSearchPage.enterSearchText(testData);
  await googleSearchPage.clickSearchButton();
  await googleSearchPage.checkSearchResults(testData);
});