import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('I sort products by value {string}', async function (value: string) {
  await this.productPage.selectSortOptionByValue(value);
});

Then('the first inventory item should be {string}', async function (expected: string) {
  await expect(this.productPage.getInventoryItem(0)).toContainText(expected);
});

Then('the last inventory item should be {string}', async function (expected: string) {
  await expect(this.productPage.getInventoryItem(5)).toContainText(expected);
});