import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartBadge = '.shopping_cart_badge';
  readonly cartLink = '.shopping_cart_link';

  constructor(page: Page) {
    this.page = page;
  }

  async openCart() {
    await this.page.click(this.cartLink);
  }

  async getCartCount() {
    return this.page.textContent(this.cartBadge);
  }
}