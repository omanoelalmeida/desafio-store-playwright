import { type Locator, type Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly productAddedMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productAddedMessage = page.getByText(
      /produto adicionado|adicionado ao carrinho|added to cart/i,
    );
  }

  async open(): Promise<void> {
    await this.page.goto('/products');
  }

  productCard(productName: string): Locator {
    /*
     * data-testid é apenas um exemplo.
     * Precisaremos verificar o HTML do site real.
     */
    return this.page
      .getByTestId('product-card')
      .filter({ hasText: productName });
  }

  async addProductToCart(productName: string): Promise<void> {
    const productCard = this.productCard(productName);

    await productCard
      .getByRole('button', {
        name: /adicionar|comprar|add to cart/i,
      })
      .click();
  }
}