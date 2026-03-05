# FJ Elite Motors - Plataforma de Revenda de Veículos

Este projeto é uma plataforma completa de revenda de veículos desenvolvida com Next.js 14+, Tailwind CSS e Prisma ORM.

## Tecnologias Utilizadas

- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Banco de Dados:** PostgreSQL
- **Validação:** Zod
- **Ícones:** Lucide React

## Pré-requisitos

- Node.js 18.x ou superior
- Instância do PostgreSQL rodando (Docker ou Local)
- NPM ou Yarn

## Instalação e Configuração

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-repositorio>
    cd "FJ Elite Motors"
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    - Renomeie ou crie o arquivo `.env` na raiz do projeto.
    - Atualize a `DATABASE_URL` com as credenciais do seu PostgreSQL.

4.  **Configure o Banco de Dados (Prisma):**
    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```

5.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    O site estará disponível em `http://localhost:3000`.

## Scripts Úteis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a versão de produção do projeto.
- `npx prisma studio`: Abre a interface visual para gerenciar o banco de dados.
- `.\scripts\backup_db.ps1`: Executa o backup automatizado do banco de dados (Windows).

## Estrutura do Projeto

- `/src/app`: Páginas e rotas da aplicação (App Router).
- `/src/components`: Componentes React reutilizáveis.
- `/src/lib`: Utilitários e configurações (Prisma client).
- `/prisma`: Schema e migrações do banco de dados.
- `/public`: Arquivos estáticos (imagens, logos).

---
Desenvolvido para FJ Elite Motors.
