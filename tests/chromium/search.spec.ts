import { test, TestInfo } from '@playwright/test';
import { GoogleSearchPage } from '../../pages/search';

// Use dotenv at entry point
import 'dotenv/config'

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

test.describe('Google Search', () => {

  test('search', async ({ page }) => {
    const testData = 'Playwright'
    const googleSearchPage = new GoogleSearchPage(page);

    await test.step('Clear disclaimer', async () => {
      await googleSearchPage.clearDisclaimer();
    });

    await test.step('Enter search text', async () => {
      await googleSearchPage.enterSearchText(testData);
    });

    await test.step('Enter search text', async () => {
      await googleSearchPage.clickSearchButton();
    });

    await test.step('Check search results', async () => {
      await googleSearchPage.checkSearchResults(testData);
    });
  });

});