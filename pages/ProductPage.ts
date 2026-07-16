import {
  type Locator,
  type Page,
} from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  readonly productTitle: Locator;
  readonly addToCartLink: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productTitle = page.locator('.name');

    this.addToCartLink = page.getByRole('link', {
      name: 'Add to cart',
      exact: true,
    });

    this.cartLink = page.getByRole('link', {
      name: 'Cart',
      exact: true,
    });
  }

  async addToCart(): Promise<string> {
    const dialogPromise = this.page.waitForEvent('dialog');

    await this.addToCartLink.click();

    const dialog = await dialogPromise;
    const message = dialog.message();

    await dialog.accept();

    return message;
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}