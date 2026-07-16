import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly accountIndicator: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByLabel(/e-mail|email/i);
    this.passwordInput = page.getByLabel(/senha|password/i);

    this.loginButton = page.getByRole('button', {
      name: /entrar|login|sign in/i,
    });

    this.accountIndicator = page.getByText(
      /minha conta|my account|bem-vindo|welcome/i,
    );
  }

  async open(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}