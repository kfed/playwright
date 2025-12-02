import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly sortDropdown = '[data-test="product-sort-container"]';
  readonly inventoryItems = '[data-test="inventory-item"]';

  constructor(page: Page) {
    this.page = page;
  }

  async selectSortOptionByValue(value: string) {
    await this.page.locator(this.sortDropdown).click();
    await this.page.locator(this.sortDropdown).selectOption({ value });
  }

  getInventoryItem(n: number): Locator {
    return this.page.locator(this.inventoryItems).nth(n);
  }
}