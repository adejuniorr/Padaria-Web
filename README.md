# 🧑‍🍳 Padaria Web 🥐🥖

Bem-vindo(a) à **Padaria Web**, uma aplicação **Fullstack** desenvolvida para gerenciar o estoque e as vendas de uma padaria fictícia. Este projeto combina **React.js** no frontend e **Laravel** no backend, com **MySQL** como banco de dados relacional.

## Índice

1. [Frontend](#frontend)  
   1.1 [📱 Responsividade](#responsividade)  
   1.2 [📋 Formulários e Validações](#formulários-e-validações)  
2. [Backend](#backend)  
   2.1 [⚙️ API](#api)  
   2.2 [💾 Banco de Dados](#banco-de-dados)  
3. [🚀 Executando a aplicação localmente](#executando-a-aplicação-localmente)  

---

## Frontend

Escrito em **TypeScript**, o frontend utiliza a poderosa biblioteca [**React.js**](https://react.dev/) e foi projetado com base em telas prototipadas no [**Figma**](https://figma.com/).

### 📱 Responsividade

Adotamos a abordagem _mobile first_, garantindo que as telas foram desenvolvidas inicialmente para dispositivos móveis, seguidas pelas versões para desktop e dispositivos intermediários, como tablets.  

Essa estratégia assegura uma ótima experiência de uso em qualquer resolução.

### 📋 Formulários e Validações

Os formulários desempenham um papel essencial nesta aplicação, permitindo executar operações CRUD (criação, leitura, atualização e exclusão) de forma confiável e segura.  

Para validação e controle de formulários, utilizamos as bibliotecas:  
- [**Zod**](https://zod.dev/): para validação e modelagem de dados.  
- [**React-Hook-Form**](https://react-hook-form.com/): para gerenciar o estado e envio dos formulários.  

---

## Backend

O backend foi construído com [**Laravel**](https://laravel.com/), um framework PHP robusto, e utiliza um banco de dados relacional estruturado no [**MySQL**](https://www.mysql.com/).

### ⚙️ API

A API REST, desenvolvida com Laravel, gerencia as operações de **criação, leitura, atualização e remoção de dados (CRUD)**.  
O modelo principal da aplicação, "Produto", e seu controlador foram configurados para atender às necessidades específicas do sistema.

### 💾 Banco de Dados

O banco de dados **MySQL** foi escolhido pela sua confiabilidade e eficiência em aplicações relacionais. Ele foi estruturado utilizando as ferramentas nativas do Laravel, como _migrations_, para facilitar a configuração e manutenção.

---

## 🚀 Executando a aplicação localmente  

Siga os passos abaixo para configurar e rodar o projeto na sua máquina.  
**Pré-requisitos:**  
- PHP instalado (recomendado: PHP 8 ou superior).  
- MySQL ou qualquer outro gerenciador de banco de dados compatível.  

### Passos:  

1. **Clone o repositório:**  
   ```bash
   git clone <link-do-repositório>
   cd padaria-web
   ```

2. **Configurar o backend:**  
   Navegue até a pasta `./backend` e execute os comandos:  
   ```bash
   composer install
   php artisan migrate
   php artisan serve
   ```

3. **Configurar o frontend:**  
   Em outro terminal, vá para a pasta `./frontend` e execute:  
   ```bash
   pnpm install
   pnpm run dev
   ```

💡 **Dica:** Se estiver usando o **VS Code no Windows**, você pode dividir o terminal em dois pressionando Ctrl+Shift+5 e rodar cada parte da aplicação em um terminal diferente

Acesse `http://localhost:5173` (ou conforme indicado pelo terminal em `./frontend`) e com isso, você estará pronto(a) para explorar o sistema de gerenciamento de estoque e vendas da Padaria Web! 😉
