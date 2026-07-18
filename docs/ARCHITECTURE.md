# Arquitetura

Este documento descreve a arquitetura do projeto de mobilidade.

## Visão Geral

O projeto é uma aplicação de página única (SPA) construída com React e Vite. A aplicação segue uma arquitetura baseada em componentes, com uma separação clara de interesses entre os componentes de UI, a lógica de negócios e os serviços.

## Estrutura de Diretórios

A estrutura de diretórios do projeto é a seguinte:

- `src/`: Contém todo o código-fonte da aplicação.
  - `main.jsx`: O ponto de entrada da aplicação.
  - `app.jsx`: O componente raiz da aplicação.
  - `app-router.jsx`: Lida com o roteamento do lado do cliente.
  - `pages/`: Contém os componentes de nível superior para cada página.
  - `components/`: Contém componentes de UI reutilizáveis.
  - `hooks/`: Contém hooks customizados do React.
  - `lib/`: Contém a lógica de negócios e utilitários.
  - `styles/`: Contém os estilos da aplicação.
  - `assets/`: Contém ativos estáticos como imagens e fontes.
- `public/`: Contém os ativos estáticos que são servidos diretamente pelo servidor web.
- `docs/`: Contém a documentação do projeto.

## Fluxo de Dados

A aplicação usa um fluxo de dados unidirecional, que é um padrão comum em aplicações React. Os dados fluem do componente pai para o componente filho através de props. As atualizações de estado são manipuladas no componente que possui o estado e passadas para os componentes filhos através de callbacks.

## Roteamento

O roteamento é tratado pelo `app-router.jsx`, que usa uma biblioteca de roteamento do lado do cliente (provavelmente React Router) para mapear as URLs para os componentes de página apropriados.

## Gerenciamento de Estado

Para o gerenciamento de estado, a aplicação pode usar uma combinação de estado de componente local (useState) e hooks de contexto (useContext) para estados mais globais. Para necessidades de gerenciamento de estado mais complexas, uma biblioteca como Redux ou Zustand pode ser usada.

## Estilo

Os estilos são definidos no diretório `styles/` e podem estar usando uma variedade de abordagens, como CSS Modules, Styled Components ou uma biblioteca de UI como Material-UI.

## Build e Performance (Cache)

O processo de build do projeto é gerenciado pelo Vite, utilizando internamente o Rollup. O projeto já implementa estratégias de cache e otimização para a entrega da aplicação em produção, configuradas no `vite.config.js`:

- **Cache Busting (Hashing):** Todos os assets e chunks gerados incluem um hash dinâmico em seus nomes (ex: `[name].[hash].js`). Isso garante que os navegadores baixem as versões mais recentes sempre que houver mudanças no código, enquanto mantêm o cache agressivo para os arquivos intactos.
- **Code Splitting (Vendor Chunks):** Bibliotecas e dependências de terceiros maiores (como `react-bootstrap`, `bootstrap-icons`, `moment` e o conteúdo da pasta `node_modules`) são separadas de forma explícita da lógica da aplicação por meio da configuração `manualChunks`. Como essas bibliotecas são atualizadas com menos frequência, elas permanecem no cache do navegador por longos períodos em deploys sucessivos, melhorando substancialmente o tempo de carregamento da aplicação.
