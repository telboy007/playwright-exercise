// step-definitions/homepage.ts
import { Given, When, Then } from "@cucumber/cucumber";
import { OurWorld } from "../types";
import { expect } from '@playwright/test';
import 'dotenv/config';

Given("I navigate to google and clear the disclaimer if present", async function (this: OurWorld) {
  await this.page.goto(`${process.env.BASE_URL}`);
  if(await this.page.getByRole('button', { name: 'Accept all' }).isVisible({ timeout: 15000 })) {
    await this.page.getByRole('button', { name: 'Accept all' }).click();
  }
});

Given("I enter search text {string}", async function (this: OurWorld, text: string) {
  await this.page.locator('#APjFqb').type(text);
  await this.page.keyboard.press('Escape');
});

When("I click search button", async function (this: OurWorld) {
  await this.page.locator('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.FPdoLc.lJ9FBc > center > input.gNO89b').waitFor();
  await this.page.locator('body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.FPdoLc.lJ9FBc > center > input.gNO89b').click();
  await this.page.waitForLoadState();
});

Then("I see {string} in the first search result", async function (this: OurWorld, text: string) {
  const searchResult = await this.page.locator('#rso > div:nth-child(1) > div > div > div > div > div > div > div > div.yuRUbf > a > h3').innerText();
  expect(searchResult).toContain(text);
});