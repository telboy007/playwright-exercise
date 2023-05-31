// test.setup.ts
import { Before, BeforeAll, After, AfterAll } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { OurWorld } from "./types";

BeforeAll(async function (this: OurWorld) {
  // Browsers are expensive in Playwright so only create 1
  global.browser = await chromium.launch({
    // Not headless so we can watch test runs
    headless: false,
    // Slow so we can see things happening
    slowMo: 50,
  });
});

AfterAll(async function (this: OurWorld) {
  await global.browser.close();
});

Before(async function (this: OurWorld) {
  this.context = await global.browser.newContext({});
  this.page = await this.context.newPage();
});

After(async function (this: OurWorld) {
  await this.page.close();
  await this.context.close();
});