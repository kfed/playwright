import { setWorldConstructor, World } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;

  async init() {
    this.browser = await chromium.launch({headless: true});
    this.page = await this.browser.newPage();
  }

  async close() {
    await this.page.close();
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);