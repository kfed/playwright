import { Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly checkoutButton = '[data-test="checkout"]';
  readonly firstNameInput = '[data-test="firstName"]';
  readonly lastNameInput = '[data-test="lastName"]';
  readonly postalCodeInput = '[data-test="postalCode"]';
  readonly continueButton = '[data-test="continue"]';
  readonly finishButton = '[data-test="finish"]';
  readonly completeHeader = '.complete-header';
  readonly summaryTotal = '.summary_total_label';

  constructor(page: Page) {
    this.page = page;
  }

  async startCheckout() {
    await this.page.click(this.checkoutButton);
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
    await this.page.click(this.continueButton);
  }

  async finishOrder() {
    await this.page.click(this.finishButton);
  }

  async isOrderComplete() {
    return this.page.locator(this.completeHeader).isVisible();
  }
  
  async getSubTotalAmount(): Promise<string> {
    const text = await this.page.locator(".summary_subtotal_label").textContent();
    if (!text) throw new Error('Total amount not found on the page');
    return text;
  }
}
