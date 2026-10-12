# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [Unreleased]
### Adicionado
- **Sincronização de Notícias**: Criado o script `scripts/sync-news.js` que lê dinamicamente todos os módulos em `src/assets/news/*.js` e gera `public/news-management/news.json`, eliminando a necessidade de manter notícias hardcoded nas ferramentas de gestão estáticas. Integrado ao pipeline com o script `npm run sync:news`.
- **Gerenciador de Notícias**: Criada a ferramenta em `public/news-management/index.html` com Vue 3 e Bootstrap 5.3 puro, permitindo visualização, edição, gerenciamento de parágrafos, exportação de arquivos individuais (`.js`) ou da coleção inteira e pré-visualização em tempo real nos formatos Artigo e Card.
- **Exceções de Operação**: Adicionado um sistema isolado em `src/assets/holidays/exceptions.js` que permite sobrescrever a classificação de um dia de operação específico (ex: "dia útil atípico"), dando total prioridade de escopo sobre as funções padrões de feriados e cálculo do dia da semana (`holiday-utils.js`).
