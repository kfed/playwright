import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

When('I select {string} from the sort dropdown', async function (sortOption: string) {
  await this.productPage.selectSortOption(sortOption);
});

Then('the products should be sorted by price in ascending order', async function () {
  const prices = await this.productPage.getProductPrices();
  const sorted = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sorted);
});

Then('the products should be sorted by price in descending order', async function () {
  const prices = await this.productPage.getProductPrices();
  const sorted = [...prices].sort((a, b) => b - a);
  expect(prices).toEqual(sorted);
});

Then('the products should be sorted alphabetically from A to Z', async function () {
  const names = await this.productPage.getProductNames();
  const sorted = [...names].sort((a, b) => a.localeCompare(b));
  expect(names).toEqual(sorted);
});

Then('the products should be sorted alphabetically from Z to A', async function () {
  const names = await this.productPage.getProductNames();
  const sorted = [...names].sort((a, b) => b.localeCompare(a));
  expect(names).toEqual(sorted);
});