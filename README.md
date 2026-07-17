# Desafio Técnico – Easysecrets

## Case 1 – Automação de Testes

Projeto de automação de testes end-to-end desenvolvido com **Playwright** e **TypeScript** para validar o fluxo principal da aplicação **DemoBlaze**.

---

# Objetivo

Automatizar o seguinte fluxo da aplicação:

1. Cadastrar um novo usuário;
2. Realizar login com o usuário cadastrado;
3. Selecionar um produto;
4. Adicionar o produto ao carrinho;
5. Validar a presença do produto no carrinho;
6. Remover o produto;
7. Validar que o produto foi removido.

---

# Tecnologias utilizadas

* Node.js
* TypeScript
* Playwright
* Dotenv
* Playwright Fixtures
* Page Object Model (POM)
* playwright-bdd (BDD com Gherkin)

---

# Decisões Técnicas

## Playwright

O Playwright foi escolhido por ser um framework moderno para automação de testes end-to-end, oferecendo suporte aos principais navegadores, esperas automáticas e uma API intuitiva para criação de testes confiáveis.

## TypeScript

O TypeScript foi utilizado para fornecer tipagem estática, melhorar a legibilidade do código e facilitar sua manutenção.

## Page Object Model (POM)

Foi adotado o padrão **Page Object Model**, separando a lógica de interação com a interface dos cenários de teste.

Essa abordagem reduz duplicação de código e facilita futuras manutenções quando houver alterações na interface da aplicação.

## Fixtures

As fixtures personalizadas disponibilizam os Page Objects para os testes, evitando repetição de inicializações e deixando os cenários focados apenas nas regras de negócio.

## Dados dinâmicos

Como a DemoBlaze não permite cadastrar usuários duplicados, o projeto gera automaticamente um novo usuário a cada execução.

Isso torna os testes independentes de execuções anteriores.

## Variáveis de ambiente

A URL da aplicação foi configurada utilizando um arquivo `.env`, evitando valores fixos no código e facilitando a execução em diferentes ambientes.

## BDD

Como diferencial, foi implementada uma versão do cenário utilizando **Behavior-Driven Development (BDD)** por meio da biblioteca `playwright-bdd`.

Essa abordagem aproxima os testes da linguagem de negócio sem perder os recursos nativos do Playwright.

---

# Estrutura do Projeto

```text
desafio-store-playwright/
├── data/
│   └── user-data.ts
├── features/
│   ├── steps/
│   │   ├── bdd.fixture.ts
│   │   └── store.steps.ts
│   └── store.feature
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
├── playwright.bdd.config.ts
├── playwright.config.ts
└── README.md
```

---

# Organização das Camadas

| Pasta                      | Responsabilidade                                                     |
| -------------------------- | -------------------------------------------------------------------- |
| `tests`                    | Contém os cenários automatizados e as validações                     |
| `pages`                    | Implementa os Page Objects e centraliza as interações com as páginas |
| `fixtures`                 | Disponibiliza os Page Objects para os testes                         |
| `features`                 | Contém os cenários escritos em Gherkin e seus Step Definitions       |
| `data`                     | Responsável pelos dados dinâmicos utilizados durante os testes       |
| `playwright.config.ts`     | Configurações gerais do Playwright                                   |
| `playwright.bdd.config.ts` | Configuração específica para execução dos testes BDD                 |

---

# Pré-requisitos

Antes de executar o projeto é necessário possuir:

* Node.js (LTS)
* npm

Para verificar as versões instaladas:

```bash
node --version
npm --version
```

---

# Instalação

Clone o repositório:

```bash
git clone https://github.com/omanoelalmeida/desafio-store-playwright.git
```

Entre na pasta:

```bash
cd desafio-store-playwright
```

Instale as dependências:

```bash
npm install
```

Instale os navegadores do Playwright:

```bash
npx playwright install
```

---

# Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto utilizando como referência o arquivo `.env.example`.

Exemplo:

```env
BASE_URL=https://www.demoblaze.com
```

O arquivo `.env` não deve ser enviado ao repositório.

---

# Execução dos Testes

## Executar os testes

```bash
npm test
```

## Executar no Chromium

```bash
npm run test:chromium
```

## Executar no Firefox

```bash
npm run test:firefox
```

## Executar no WebKit

```bash
npm run test:webkit
```

## Executar com navegador aberto

```bash
npm run test:headed
```

## Abrir a interface do Playwright

```bash
npm run test:ui
```

## Executar em modo de depuração

```bash
npm run test:debug
```

---

# Verificação do TypeScript

Para validar a tipagem do projeto:

```bash
npm run typecheck
```

---

# Relatório de Execução

Após executar os testes, abra o relatório HTML:

```bash
npm run test:report
```

---

# Dados Dinâmicos

A DemoBlaze não permite cadastrar usuários já existentes.

Para evitar dependência de dados previamente cadastrados, o projeto gera automaticamente um nome de usuário único utilizando timestamp e um valor aleatório.

Exemplo:

```text
manoelqa_1784227215349_6425
```

Essa estratégia permite executar o teste repetidas vezes sem necessidade de limpeza da base de dados.

---

# Cenário Automatizado

O cenário principal encontra-se em:

```text
tests/e2e/store-flow.spec.ts
```

Fluxo automatizado:

* Cadastro de usuário
* Login
* Seleção de produto
* Adição ao carrinho
* Validação do carrinho
* Remoção do produto
* Validação da remoção

---

# BDD com Gherkin

Como diferencial, o projeto também implementa o mesmo fluxo utilizando **Behavior-Driven Development (BDD)**.

O cenário foi escrito em **Gherkin** e executado através da biblioteca `playwright-bdd`.

Arquivos principais:

```text
features/store.feature
```

```text
features/steps/store.steps.ts
```

```text
features/steps/bdd.fixture.ts
```

```text
playwright.bdd.config.ts
```

### Gerar os testes BDD

```bash
npm run bdd:generate
```

### Executar o cenário BDD

```bash
npm run test:bdd
```

### Executar com navegador aberto

```bash
npm run test:bdd:headed
```

### Abrir o relatório BDD

```bash
npm run test:bdd:report
```

A pasta `.features-gen` é gerada automaticamente pela biblioteca e, por esse motivo, não é versionada.

---

# Boas Práticas Aplicadas

* Page Object Model (POM);
* Organização em camadas;
* Fixtures personalizadas;
* Dados dinâmicos para usuários;
* Separação entre regras de negócio e interações da interface;
* Uso de TypeScript;
* Uso de `test.step()` para melhor organização do fluxo;
* Código reutilizável;
* Estrutura preparada para expansão dos testes;
* Implementação de BDD utilizando Gherkin.

---

# Aplicação Testada

DemoBlaze

https://www.demoblaze.com
