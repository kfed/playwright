import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

Given('I am on the SauceDemo login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
});

When('I login with username {string} and password {string}', async function (username: string, password: string) {
  await this.loginPage.login(username, password);
});

Then('I should be redirected to the inventory page', async function () {
  await expect(this.loginPage.page).toHaveURL(/inventory.html/);
});

Then('I should see an error message', async function () {
  const errorMsg = await this.loginPage.getErrorMessage();
  expect(errorMsg).not.toBeNull();
});