import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/Checkout';


Given('I am on the SauceDemo login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
});

Given('I am logged in as {string} with password {string}', async function (username: string, password: string) {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
  await this.loginPage.login(username, password);
  await expect(this.page).toHaveURL(/inventory.html/);

  // Optionally initialize other page objects here if needed
  this.productPage = new ProductPage(this.page);
  this.checkoutPage = new CheckoutPage(this.page);
});

When('I login with username {string} and password {string}', async function (username: string, password: string) {
  const loginPromise = this.loginPage.login(username, password);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Login timed out after 5 seconds')), 5000)
  );

  try {
    await Promise.race([loginPromise, timeoutPromise]);
    this.loginError = null;
  } catch (error: any) {
    this.loginError = error;
  }
});

Then('I should be redirected to the inventory page', async function () {
  await expect(this.loginPage.page).toHaveURL(/inventory.html/);
});

Then('I should see an error message', async function () {
  const errorMsg = await this.loginPage.getErrorMessage();
  expect(errorMsg).not.toBeNull();
});

Then('I should still be on the login page after 5 seconds', async function () {
    expect(this.loginError.message).toContain('Login timed out after 5 seconds');
});