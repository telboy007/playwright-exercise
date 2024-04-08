// google search page objects 
 
import { expect, Locator, Page } from '@playwright/test';

export class GoogleSearchPage {
  readonly page: Page;
  readonly searchTextField: Locator;
  readonly searchButton: Locator;
  readonly resultString: Locator;
  readonly acceptAllButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptAllButton = page.getByRole('button', { name: 'Accept all' });
    this.searchTextField = page.locator('#APjFqb');
    this.searchButton = page.getByRole('button', { name: 'Google Search' }).first();
    this.resultString = page.locator('#rso > div.hlcw0c > div > div > div > div > div > div > div > div.yuRUbf > div > span > a > h3');
  }

  async clearDisclaimer() {
    if(await this.acceptAllButton.isVisible({ timeout: 15000 })) {
      await this.acceptAllButton.click();
    }
  }

  async enterSearchText(string: string) {
    await this.searchTextField.type(string);
    await this.page.keyboard.press('Escape');
  }

  async clickSearchButton() {
    await this.searchButton.waitFor();
    await this.searchButton.click();
    await this.page.waitForLoadState();
  }

  async checkSearchResults(string: string) {
    const searchResult = await this.resultString.innerText();
    expect(searchResult).toContain(string);
  }
}
