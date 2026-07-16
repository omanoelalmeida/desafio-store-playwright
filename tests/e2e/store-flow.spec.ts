import { test, expect } from '../../fixtures/store.fixture';
import { createUniqueUser } from '../../data/user-data';

test.describe('Fluxo de compra da DemoBlaze', () => {
  test('deve cadastrar, fazer login, adicionar e remover um produto', async ({
    homePage,
    productPage,
    cartPage,
  }) => {
    const user = createUniqueUser();
    const productName = 'Samsung galaxy s6';

    await test.step('Cadastrar um novo usuário', async () => {
      await homePage.open();

      const signUpMessage = await homePage.signUp(user);

      expect(signUpMessage).toContain('Sign up successful');
    });

    await test.step('Fazer login com o usuário cadastrado', async () => {
      await homePage.login(user);

      await expect(homePage.welcomeMessage).toHaveText(
        `Welcome ${user.username}`,
        {
          timeout: 15_000,
        },
      );
    });

    await test.step('Abrir um produto', async () => {
      await homePage.openProduct(productName);

      await expect(productPage.productTitle).toHaveText(productName);
    });

    await test.step('Adicionar o produto ao carrinho', async () => {
      const addToCartMessage = await productPage.addToCart();

      expect(addToCartMessage).toContain('Product added');
    });

    await test.step('Validar o produto no carrinho', async () => {
      await productPage.openCart();

      const productRow = cartPage.productRow(productName);

      await expect(productRow).toBeVisible();
      await expect(productRow).toContainText(productName);
    });

    await test.step('Remover o produto do carrinho', async () => {
      await cartPage.removeProduct(productName);

      await expect(
        cartPage.productRow(productName),
      ).toHaveCount(0);
    });
  });
});