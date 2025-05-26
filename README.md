# Jesus Disse App

Este é um aplicativo Next.js construído com React, Tailwind CSS e ShadCN UI, utilizando Genkit para funcionalidades de IA. O objetivo do aplicativo é fornecer mensagens de sabedoria e conforto inspiradas nos ensinamentos de Jesus.

## Stack Tecnológica

*   **Framework:** Next.js (com App Router)
*   **Linguagem:** TypeScript
*   **UI:** React, ShadCN UI
*   **Estilização:** Tailwind CSS
*   **IA:** Genkit (com Google AI - Gemini)

## Pré-requisitos

*   Node.js (versão 18 ou superior recomendada)
*   npm (ou yarn)

## Configuração do Ambiente

1.  **Chave de API do Google AI:**
    Este projeto usa Genkit com o Google AI. Você precisará de uma chave de API do Google Cloud com a "Generative Language API" habilitada.
    Crie um arquivo `.env` na raiz do projeto (copie `.env.example` se existir um, ou crie um novo) e adicione sua chave:
    ```env
    GOOGLE_API_KEY=SUA_CHAVE_DE_API_AQUI
    ```
    *Nota: O arquivo `.env` já está incluído no `.gitignore` e não deve ser enviado para o GitHub.*

## Como Rodar o Projeto Localmente

1.  **Clone o repositório (se estiver começando do GitHub):**
    ```bash
    git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
    cd SEU_REPOSITORIO
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```
    (ou `yarn install` se você preferir usar Yarn)

3.  **Rode os fluxos Genkit em modo de desenvolvimento (em um terminal separado):**
    Este comando inicia o servidor de desenvolvimento da Genkit e observa as alterações nos arquivos de fluxo.
    ```bash
    npm run genkit:watch
    ```
    (Alternativamente, `npm run genkit:dev` para iniciar sem o modo de observação)
    A UI de desenvolvimento da Genkit geralmente fica acessível em `http://localhost:4000`.

4.  **Rode a aplicação Next.js (em outro terminal):**
    ```bash
    npm run dev
    ```
    Abra [http://localhost:9002](http://localhost:9002) (conforme definido no `package.json`) no seu navegador para ver o aplicativo.

## Scripts Disponíveis

No `package.json`, você encontrará os seguintes scripts:

*   `npm run dev`: Inicia o servidor de desenvolvimento do Next.js.
*   `npm run genkit:dev`: Inicia o servidor Genkit.
*   `npm run genkit:watch`: Inicia o servidor Genkit com observação de arquivos.
*   `npm run build`: Constrói a aplicação Next.js para produção.
*   `npm run start`: Inicia um servidor de produção do Next.js.
*   `npm run lint`: Executa o ESLint.
*   `npm run typecheck`: Verifica os tipos com TypeScript.

## Deploy na Netlify

Este projeto inclui um arquivo `netlify.toml` que configura o build para a Netlify.

1.  Conecte seu repositório GitHub à Netlify.
2.  Configure as variáveis de ambiente necessárias (como `GOOGLE_API_KEY`) nas configurações do seu site na Netlify.
3.  A Netlify deve detectar automaticamente as configurações de build do Next.js.

O deploy utilizará o comando `npm run build` e publicará o diretório `.next`.
