import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('I add the following items to the cart:', async function (dataTable) {
  for (const { item } of dataTable.hashes()) {
    const itemLocator = this.page.locator(`.inventory_item:has-text("${item}") button`);
    await itemLocator.click();
  }
});

Then('the cart should contain {int} items', async function (count: number) {
  await this.productPage.openCart();
  const cartCount = await this.productPage.getCartCount();
  expect(cartCount).toBe(String(count));
});

Given('I have added {string} and {string} to the cart', async function (item1: string, item2: string) {
  for (const item of [item1, item2]) {
    const itemLocator = this.page.locator(`.inventory_item:has-text("${item}") button`);
    await itemLocator.click();
  }
});

When('I proceed to checkout and enter first name {string}, last name {string}, and postal code {string}',
  async function (firstName: string, lastName: string, postalCode: string) {
    await this.productPage.openCart();
    await this.checkoutPage.startCheckout();
    await this.checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
  }
);

When('I finish the order', async function () {
  await this.checkoutPage.finishOrder();
});

Then('the order should be completed successfully', async function () {
  const isComplete = await this.checkoutPage.isOrderComplete();
  expect(isComplete).toBeTruthy();
  await expect(this.page.locator('.complete-header')).toHaveText(/THANK YOU FOR YOUR ORDER/i);
});

Then('the total amount should be "${float}"', async function (expectedTotal: number) {
  // Wait for the summary total to be visible
  await this.page.waitForSelector('.summary_total_label', { state: 'visible', timeout: 10000 });
  const totalText = await this.checkoutPage.getSubTotalAmount();
  const match = totalText?.match(/\$([\d.]+)/);
  expect(match).not.toBeNull();
  const total = parseFloat(match![1]);
  expect(total).toBeCloseTo(expectedTotal, 2);
});