import {
  type Locator,
  type Page,
} from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartTableBody: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTableBody = page.locator('#tbodyid');
  }

  productRow(productName: string): Locator {
    return this.cartTableBody
      .locator('tr')
      .filter({
        hasText: productName,
      });
  }

  async removeProduct(productName: string): Promise<void> {
    const productRow = this.productRow(productName);

    await productRow
      .getByRole('link', {
        name: 'Delete',
        exact: true,
      })
      .click();
  }
}