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

## Configuração do Ambiente Local

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

1.  **Conecte seu repositório GitHub à Netlify.**
2.  **Configure as Variáveis de Ambiente na Netlify (CRUCIAL):**
    *   Seu aplicativo **precisa** da `GOOGLE_API_KEY` para funcionar. Esta chave não deve estar no seu código no GitHub.
    *   Na Netlify, vá para: **Site settings > Build & deploy > Environment > Environment variables**.
    *   Clique em "Edit variables" e adicione uma nova variável:
        *   **Key:** `GOOGLE_API_KEY`
        *   **Value:** `SUA_CHAVE_DE_API_AQUI` (cole sua chave de API real aqui)
    *   **Importante:** Certifique-se de que o valor da chave de API esteja correto e que a API "Generative Language API" esteja habilitada no seu projeto Google Cloud.
3.  **Configurações de Build (geralmente automáticas):**
    *   A Netlify deve detectar automaticamente as configurações de build do Next.js (comando `npm run build`, diretório de publicação `.next`) graças ao `netlify.toml` e ao plugin `@netlify/plugin-nextjs`.
4.  **Inicie o Deploy:**
    *   Após conectar o repositório e configurar as variáveis de ambiente, a Netlify tentará fazer o build e o deploy automaticamente a cada `push` para a branch configurada (geralmente `main`).

O deploy utilizará o comando `npm run build` e publicará o diretório `.next`. Se houver falhas de compilação, verifique os logs de build na interface da Netlify para obter detalhes específicos do erro.
```