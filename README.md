# 🎬 Meu Catálogo de Filmes - Edição Especial

Este é um projeto de catálogo de filmes desenvolvido em **React**, consumindo a API do **The Movie Database (TMDB)**. O layout foi focado em uma experiência de usuário (UX) premium, com modo escuro, trailers centralizados e filtros inteligentes.

---

## 🤖 Desenvolvimento com Inteligência Artificial

O diferencial deste projeto é que ele foi **desenvolvido em parceria com a IA Gemini**.

### Por que isso é importante?
Saber utilizar ferramentas de IA não substitui o conhecimento técnico, mas o **potencializa**. Durante o desenvolvimento, utilizei o Gemini como um **Thought Partner** para:
* **Refatoração de Layout:** Ajustes precisos de CSS para centralização de vídeos e responsividade.
* **Lógica de Estado Complexa:** Implementação de paginação acumulativa (Carregar Mais) e sincronização de filtros.
* **Acessibilidade:** Inclusão de atalhos de teclado (como fechar modal com Esc).
* **Resolução de Erros:** Diagnóstico rápido de erros de compilação e lógica de API.

---

## 🚀 Funcionalidades Principais

-   **Grid Dinâmico:** Cards com nota flutuante e sinopse resumida.
-   **Filtros de Três Eixos:** Busca por Gênero, Ano de Lançamento e Avaliação (+8.0, +8.5).
-   **Modal Detalhado:** -   Trailer oficial via YouTube incorporado e centralizado.
    -   Exibição do **Elenco Principal** (Atores).
    -   **Onde Assistir:** Integração com provedores de streaming (Netflix, Disney+, etc) disponíveis no Brasil.
-   **Paginação:** Botão "Carregar Mais" que preserva o contexto da busca atual.

---

## 🛠️ Tecnologias Utilizadas

* [React.js](https://reactjs.org/)
* [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS) (Flexbox e Grid)
* [TMDB API](https://www.themoviedb.org/documentation/api)
* [Vite](https://vitejs.dev/)

---

## 📸 Screenshots

| Página Principal | Filtros Organizados | Modal com Trailer |
| :---: | :---: | :---: |
| ![Grid](https://via.placeholder.com/300x200?text=Grid+Filmes) | ![Filtros](https://via.placeholder.com/300x200?text=Filtros) | ![Modal](https://via.placeholder.com/300x200?text=Modal+Trailer) |

---

## 📥 Como rodar o projeto

1. Clone o repositório:
   ```bash
   git clone [https://github.com/seu-usuario/catalogo-filmes.git](https://github.com/seu-usuario/catalogo-filmes.git)

2. Instale as dependências:
   ```bash
   npm install

3. Inicie o servidor:
    ```bash
    npm run dev

Projeto desenvolvido para fins de aprendizado em React e Engenharia de Prompt.