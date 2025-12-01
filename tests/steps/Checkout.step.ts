import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/Checkout';

Given('I am logged in as {string} with password {string}', async function (username: string, password: string) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
  await this.loginPage.login(username, password);
  await expect(this.page).toHaveURL(/inventory.html/);
  this.cartPage = new CartPage(this.page);
  this.checkoutPage = new CheckoutPage(this.page);
});

When('I add the following items to the cart:', async function (dataTable) {
  for (const { item } of dataTable.hashes()) {
    const itemLocator = this.page.locator(`.inventory_item:has-text("${item}") button`);
    await itemLocator.click();
  }
});

Then('the cart should contain {int} items', async function (count: number) {
  await this.cartPage.openCart();
  const cartCount = await this.cartPage.getCartCount();
  expect(cartCount).toBe(String(count));
});

Given('I have added {string} and {string} to the cart', async function (item1: string, item2: string) {
  for (const item of [item1, item2]) {
    const itemLocator = this.page.locator(`.inventory_item:has-text("${item}") button`);
    await itemLocator.click();
  }
});

When(
  'I proceed to checkout and enter first name {string}, last name {string}, and postal code {string}',
  async function (firstName: string, lastName: string, postalCode: string) {
    await this.cartPage.openCart();
    await this.checkoutPage.startCheckout();
    await this.checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await this.checkoutPage.finishOrder();
  }
);

Then('the order should be completed successfully', async function () {
  const isComplete = await this.checkoutPage.isOrderComplete();
  expect(isComplete).toBeTruthy();
  await expect(this.page.locator('.complete-header')).toHaveText(/THANK YOU FOR YOUR ORDER/i);
});