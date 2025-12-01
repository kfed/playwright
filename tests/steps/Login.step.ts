import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

Given('I am on the SauceDemo login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
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