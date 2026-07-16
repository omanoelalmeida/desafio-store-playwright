# Desafio de Automação — DemoBlaze

Projeto de automação de testes end-to-end desenvolvido com Playwright e TypeScript para validar o fluxo principal da aplicação DemoBlaze.

## Objetivo

Automatizar o seguinte fluxo:

1. Cadastrar um novo usuário;
2. Realizar login com o usuário cadastrado;
3. Selecionar um produto;
4. Adicionar o produto ao carrinho;
5. Validar a presença do produto no carrinho;
6. Remover o produto;
7. Validar que o produto foi removido.

## Tecnologias utilizadas

* Node.js
* TypeScript
* Playwright
* Dotenv
* Page Object Model
* Playwright Fixtures

## Arquitetura do projeto

```text
desafio-store-playwright/
├── data/
│   └── user-data.ts
├── fixtures/
│   └── store.fixture.ts
├── pages/
│   ├── CartPage.ts
│   ├── HomePage.ts
│   └── ProductPage.ts
├── tests/
│   └── e2e/
│       └── store-flow.spec.ts
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
└── README.md
```

### Responsabilidade das camadas

* `tests`: contém os cenários e asserções dos testes;
* `pages`: contém os Page Objects e as interações com as páginas;
* `fixtures`: disponibiliza os Page Objects para os testes;
* `data`: contém tipos e geração de dados dinâmicos;
* `playwright.config.ts`: contém as configurações gerais do Playwright.

## Pré-requisitos

Antes de executar o projeto, é necessário instalar:

* Node.js LTS;
* npm.

Para verificar as instalações:

```bash
node --version
npm --version
```

## Instalação

Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd desafio-store-playwright
```

Instale as dependências:

```bash
npm install
```

Instale os navegadores utilizados pelo Playwright:

```bash
npx playwright install
```

## Configuração do ambiente

Crie um arquivo chamado `.env` na raiz do projeto.

Use o arquivo `.env.example` como referência:

```env
BASE_URL=https://www.demoblaze.com
```

O arquivo `.env` não deve ser enviado ao repositório.

## Execução dos testes

### Executar todos os testes

```bash
npm test
```

### Executar somente no Chromium

```bash
npm run test:chromium
```

### Executar somente no Firefox

```bash
npm run test:firefox
```

### Executar somente no WebKit

```bash
npm run test:webkit
```

### Executar com o navegador aberto

```bash
npm run test:headed
```

### Abrir a interface visual do Playwright

```bash
npm run test:ui
```

### Executar em modo de depuração

```bash
npm run test:debug
```

## Validação do TypeScript

Para verificar erros de tipagem sem executar os testes:

```bash
npm run typecheck
```

## Relatório de execução

Depois da execução dos testes, abra o relatório HTML com:

```bash
npm run test:report
```

## Boas práticas aplicadas

* Page Object Model;
* Separação do projeto em camadas;
* Fixtures personalizadas;
* Geração dinâmica de usuários;
* Asserções objetivas;
* Uso de `test.step`;
* Seletores centralizados;
* Código reutilizável;
* Tipagem com TypeScript;
* Captura e validação de alertas;
* Evidências de falha com screenshots, vídeos e traces.

## Dados dinâmicos

A DemoBlaze não permite cadastrar novamente um usuário já existente.

Por isso, o projeto gera um nome de usuário único em cada execução utilizando data, hora e um sufixo aleatório.

Exemplo:

```text
manoelqa_1784227215349_6425
```

Isso evita dependência de dados cadastrados anteriormente e permite executar o teste várias vezes.

## Cenário automatizado

O cenário principal está localizado em:

```text
tests/e2e/store-flow.spec.ts
```

O teste é dividido nas seguintes etapas:

* Cadastro de um novo usuário;
* Login;
* Abertura do produto;
* Adição ao carrinho;
* Validação do produto;
* Remoção do produto;
* Validação da remoção.

## Aplicação testada

DemoBlaze:

```text
https://www.demoblaze.com
```
## BDD com Gherkin

Como diferencial, o projeto também possui uma implementação utilizando Behavior-Driven Development (BDD), com cenários escritos em Gherkin e executados por meio do `playwright-bdd`.

O cenário BDD está localizado em:

```text
features/store.feature
```

As definições das etapas estão em:

```text
features/steps/store.steps.ts
```

A fixture específica do BDD está em:

```text
features/steps/bdd.fixture.ts
```

A configuração de execução está no arquivo:

```text
playwright.bdd.config.ts
```

### Cenário automatizado em Gherkin

```gherkin
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
```

### Gerar os testes BDD

```bash
npm run bdd:generate
```

### Executar o cenário BDD

```bash
npm run test:bdd
```

### Executar o BDD com o navegador aberto

```bash
npm run test:bdd:headed
```

### Abrir o relatório BDD

```bash
npm run test:bdd:report
```

A pasta `.features-gen` é gerada automaticamente pelo `playwright-bdd` e não é versionada no repositório.
