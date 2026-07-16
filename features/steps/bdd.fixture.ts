import { expect } from '@playwright/test';
import {
  createBdd,
  test as base,
} from 'playwright-bdd';

import { type UserData } from '../../data/user-data';
import { CartPage } from '../../pages/CartPage';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';

type ScenarioData = {
  user?: UserData;
  productName?: string;
};

type BddFixtures = {
  homePage: HomePage;
  productPage: ProductPage;
  cartPage: CartPage;
  scenarioData: ScenarioData;
};

export const test = base.extend<BddFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  scenarioData: async ({}, use) => {
    await use({});
  },
});

export { expect };

export const {
  Given,
  When,
  Then,
} = createBdd(test);