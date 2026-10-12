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

## Comunicação em Tempo Real (WebSockets)

Além das requisições REST tradicionais via Axios, a aplicação mantém uma instância única (Singleton) do cliente `socket.io-client` (em `src/lib/socket.js`). Isso garante que o tráfego de dados ao vivo, como as previsões de ônibus, aproveite a mesma origem da API, reagindo passivamente a eventos de estado do Socket de forma centralizada através dos Hooks customizados do React.

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

## Subsistema de Calendário, Feriados e Exceções Operacionais

A camada de inteligência temporal e de quadro de horários da aplicação é organizada de maneira modular sob `src/assets/holidays/` e consumida através de utilitários em `src/lib/holiday-utils.js`:

- `src/assets/holidays/`:
  - `national.js`: Feriados nacionais fixos e de abrangência universal.
  - `state.js`: Feriados de nível estadual (ex: Minas Gerais).
  - `regional.js`: Feriados municipais e metropolitanos estruturados por cidade (`city`) e linhas afetadas.
  - `movable.js`: Algoritmo gregoriano anônimo para cálculo dinâmico da Páscoa, Carnaval, Sexta-feira Santa e Corpus Christi.
  - `exceptions.js`: Sistema de dias operacionais atípicos (ex: turnos eleitorais) com prioridade máxima sobre o cálculo convencional de horários.
  - `vacations.js`: Definições de períodos de férias escolares e de meio de ano.
  - `index.js`: Ponto de agregação e normalização da coleção de feriados com metadados completos de escopo territorial e quadros alvos de operação.
- `src/lib/holiday-utils.js`:
  - Contém a função `isEventApplicableToLine`, responsável pelo casamento polimórfico entre linhas (por objeto `line`, cidade, origem/destino ou número) e eventos de calendário.
  - Provê `getTodayHolidayData`, `getTodayExceptionData` e `getCurrentDayGroupName`.

