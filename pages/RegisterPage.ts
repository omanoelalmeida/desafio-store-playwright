import { type Locator, type Page } from '@playwright/test';
import { type UserData } from '../data/user-data';

export class RegisterPage {
  readonly page: Page;

  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    /*
     * Estes seletores são provisórios.
     * Eles serão ajustados ao site real.
     */
    this.nameInput = page.getByLabel(/nome|name/i);
    this.emailInput = page.getByLabel(/e-mail|email/i);
    this.passwordInput = page.getByLabel(/^senha$|^password$/i);

    this.confirmPasswordInput = page.getByLabel(
      /confirmar senha|confirm password/i,
    );

    this.registerButton = page.getByRole('button', {
      name: /cadastrar|criar conta|register|sign up/i,
    });

    this.successMessage = page.getByText(
      /cadastro realizado|conta criada|account created|success/i,
    );
  }

  async open(): Promise<void> {
    await this.page.goto('/register');
  }

  async register(user: UserData): Promise<void> {
    await this.nameInput.fill(user.name);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.registerButton.click();
  }
}