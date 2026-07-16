# language: pt

@bdd @e2e
Funcionalidade: Gerenciamento de produto no carrinho da DemoBlaze
  Como cliente da loja
  Quero cadastrar uma conta e gerenciar um produto no carrinho
  Para validar o funcionamento do fluxo principal de compra

  Cenário: Cadastrar usuário, adicionar e remover um produto
    Dado que um novo usuário foi cadastrado
    E que ele realizou login com os dados cadastrados
    Quando ele adiciona o produto "Samsung galaxy s6" ao carrinho
    Então o produto deve aparecer no carrinho
    Quando ele remove o produto do carrinho
    Então o produto não deve mais aparecer no carrinho