import { createUniqueUser } from '../../data/user-data';

import {
  Given,
  When,
  Then,
  expect,
} from './bdd.fixture';

Given(
  'que um novo usuário foi cadastrado',
  async ({
    homePage,
    scenarioData,
  }) => {
    const user = createUniqueUser();

    scenarioData.user = user;

    await homePage.open();

    const signUpMessage = await homePage.signUp(user);

    expect(signUpMessage).toContain(
      'Sign up successful',
    );
  },
);

Given(
  'que ele realizou login com os dados cadastrados',
  async ({
    homePage,
    scenarioData,
  }) => {
    const user = scenarioData.user;

    if (!user) {
      throw new Error(
        'O usuário precisa ser criado antes do login.',
      );
    }

    await homePage.login(user);

    await expect(
      homePage.welcomeMessage,
    ).toHaveText(
      `Welcome ${user.username}`,
      {
        timeout: 15_000,
      },
    );
  },
);

When(
  'ele adiciona o produto {string} ao carrinho',
  async ({
    homePage,
    productPage,
    scenarioData,
  }, productName: string) => {
    scenarioData.productName = productName;

    await homePage.openProduct(productName);

    await expect(
      productPage.productTitle,
    ).toHaveText(productName);

    const addToCartMessage =
      await productPage.addToCart();

    expect(addToCartMessage).toContain(
      'Product added',
    );

    await productPage.openCart();
  },
);

Then(
  'o produto deve aparecer no carrinho',
  async ({
    cartPage,
    scenarioData,
  }) => {
    const productName =
      scenarioData.productName;

    if (!productName) {
      throw new Error(
        'Nenhum produto foi selecionado.',
      );
    }

    const productRow =
      cartPage.productRow(productName);

    await expect(productRow).toBeVisible();

    await expect(productRow).toContainText(
      productName,
    );
  },
);

When(
  'ele remove o produto do carrinho',
  async ({
    cartPage,
    scenarioData,
  }) => {
    const productName =
      scenarioData.productName;

    if (!productName) {
      throw new Error(
        'Nenhum produto foi selecionado para remoção.',
      );
    }

    await cartPage.removeProduct(productName);
  },
);

Then(
  'o produto não deve mais aparecer no carrinho',
  async ({
    cartPage,
    scenarioData,
  }) => {
    const productName =
      scenarioData.productName;

    if (!productName) {
      throw new Error(
        'Nenhum produto foi selecionado.',
      );
    }

    await expect(
      cartPage.productRow(productName),
    ).toHaveCount(0);
  },
);