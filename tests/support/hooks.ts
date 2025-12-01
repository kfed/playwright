// filepath: /Users/kd/playwright/tests/support/hooks.ts
import { Before, After } from '@cucumber/cucumber';

Before(async function () {
  await this.init();
});

After(async function () {
  await this.close();
});