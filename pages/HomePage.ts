import {
  type Locator,
  type Page,
} from '@playwright/test';

import { type UserData } from '../data/user-data';

export class HomePage {
  readonly page: Page;

  readonly signUpLink: Locator;
  readonly signUpUsernameInput: Locator;
  readonly signUpPasswordInput: Locator;
  readonly signUpButton: Locator;

  readonly loginLink: Locator;
  readonly loginUsernameInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;

  readonly welcomeMessage: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Elementos do modal de cadastro.
    this.signUpLink = page.getByRole('link', {
      name: 'Sign up',
    });

    this.signUpUsernameInput = page.locator('#sign-username');
    this.signUpPasswordInput = page.locator('#sign-password');

    this.signUpButton = page.getByRole('button', {
      name: 'Sign up',
    });

    // Elementos do modal de login.
    this.loginLink = page.getByRole('link', {
      name: 'Log in',
    });

    this.loginUsernameInput = page.locator('#loginusername');
    this.loginPasswordInput = page.locator('#loginpassword');

    this.loginButton = page.getByRole('button', {
      name: 'Log in',
    });

    // Elementos exibidos depois do login.
    this.welcomeMessage = page.locator('#nameofuser');

    this.cartLink = page.getByRole('link', {
      name: 'Cart',
      exact: true,
    });
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async signUp(user: UserData): Promise<string> {
    await this.signUpLink.click();

    await this.signUpUsernameInput.fill(user.username);
    await this.signUpPasswordInput.fill(user.password);

    const dialogPromise = this.page.waitForEvent('dialog');

    await this.signUpButton.click();

    const dialog = await dialogPromise;
    const message = dialog.message();

    await dialog.accept();

    return message;
  }

async login(user: UserData): Promise<void> {
  await this.loginLink.click();

  await this.loginUsernameInput.fill(user.username);
  await this.loginPasswordInput.fill(user.password);

  const loginResponsePromise = this.page.waitForResponse(
    response =>
      response.url().includes('/login') &&
      response.request().method() === 'POST',
  );

  const pageReloadPromise = this.page.waitForEvent('load');

  await this.loginButton.click();

  const loginResponse = await loginResponsePromise;

  if (!loginResponse.ok()) {
    throw new Error(
      `A requisição de login falhou com status ${loginResponse.status()}.`,
    );
  }

  await pageReloadPromise;
}

  async openProduct(productName: string): Promise<void> {
    await this.page
      .getByRole('link', {
        name: productName,
        exact: true,
      })
      .click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}