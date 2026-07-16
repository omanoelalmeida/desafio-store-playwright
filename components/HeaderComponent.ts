import { type Locator, type Page } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;

  readonly logoutControl: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.logoutControl = page
      .getByText(/sair|logout|sign out/i)
      .first();

    this.cartLink = page
      .getByText(/carrinho|cart/i)
      .first();
  }

  async logoutIfVisible(): Promise<void> {
    const isLogoutVisible = await this.logoutControl.isVisible();

    if (isLogoutVisible) {
      await this.logoutControl.click();
    }
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}