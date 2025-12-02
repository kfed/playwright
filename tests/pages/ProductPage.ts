import { Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly sortDropdown = '[data-test="product_sort_container"]';
  readonly productNames = '.inventory_item_name';
  readonly productPrices = '.inventory_item_price';

  constructor(page: Page) {
    this.page = page;
  }

  async selectSortOption(option: string) {
    await this.page.locator(this.sortDropdown).selectOption({ label: option });
 }
 
  async getProductNames(): Promise<string[]> {
    return this.page.$$eval(this.productNames, els => els.map(e => e.textContent!.trim()));
  }

  async getProductPrices(): Promise<number[]> {
    return this.page.$$eval(this.productPrices, els =>
      els.map(e => parseFloat(e.textContent!.replace('$', '')))
    );
  }
}