# Estrutura e Lógica do Repositório de Ônibus

Este documento descreve a arquitetura técnica implementada no frontend (React + Vite) para o módulo Repositório de Ônibus. A estrutura segue o princípio de coesão, mantendo a responsabilidade de gestão da frota isolada de outros domínios da aplicação, como horários e monitoramento em tempo real.

## Estruturação de Componentes e Diretórios

Os componentes e páginas foram organizados para garantir o reuso e a escalabilidade:

### 1. Páginas (`src/pages/bus-repo/`)
- **`bus-list.jsx`**: A tela principal da funcionalidade. Responsável por exibir a listagem em formato de grid. Controla o estado de busca e de carregamento inicial dos veículos.
- **`bus-details.jsx`**: Tela dedicada para o roteamento individual de cada ônibus (`/bus-repo/:id`). Agrega os dados operacionais e de conservação do veículo e carrega componentes filhos de especificações e linha do tempo.

### 2. Componentes de UI (`src/components/bus-repo/`)
Todos os componentes utilizam o React Bootstrap para manter o padrão visual do projeto:
- **`bus-card.jsx`**: Representação de um veículo em formato de "Card". Exibe badges de status e resumos de tecnologia embarcada (Ar Condicionado, Wi-fi).
- **`bus-filters.jsx`**: Painel de busca e filtros. Envia dados para o estado "filters" na página pai, permitindo a separação de responsabilidades.
- **`technical-specs.jsx`**: Estrutura tabular para detalhamento de chassi, carroceria e facilidades de acessibilidade e conforto.
- **`history-timeline.jsx`**: Componente visual customizado que combina arrays de manutenções e incidentes, os ordena cronologicamente e os exibe em uma linha do tempo vertical com ícones contextuais.

### 3. Lógica de Negócio e Serviços (`src/lib/`)
- **`bus-repo-service.js`**: Único ponto de contato com a camada de dados. Possui funções abstratas como `getVehicles()` e `getVehicleById(id)`. Atualmente, resolve requisições baseadas no arquivo de mock local (simulando delays de rede via setTimeout), mas no futuro poderá realizar chamadas HTTP usando `Axios` para consumir endpoints de uma API.

### 4. Dados e Tipagem (`src/resources/`)
- **`bus-repo-types.ts`**: Contratos rigorosos utilizando Interfaces e Enums no TypeScript. Garante a conformidade estrutural ao longo de todo o ciclo de vida dos dados.
- **`bus-repo-mock.ts`**: Fonte primária dos dados em tempo de desenvolvimento. Substitui temporariamente a conexão com banco de dados real.

## Lógica de Pesquisa e Filtros

A inteligência de pesquisa do módulo opera atualmente do lado do cliente (Client-Side), utilizando o Hook `useMemo` em `bus-list.jsx` para garantir a re-renderização apenas quando os parâmetros mudam:

1. **Pesquisa Textual (Fuzzy Simples):**
   - Combina a busca textual em múltiplos campos.
   - O termo digitado na barra de pesquisa é verificado (através de `includes()`) de forma case-insensitive nas chaves `licensePlate`, `fleetNumber` e `company.name`.

2. **Filtros Exclusivos (Enums):**
   - O combobox de `status` aplica a regra estrita para igualdade, ocultando registros cujo `status` seja diferente do selecionado.

3. **Filtros Booleanos Aditivos:**
   - As checkboxes de conforto (`hasAc`, `hasWifi`, `hasAirSuspension`) funcionam como um filtro afirmativo: quando ativadas, escondem qualquer veículo que responda `false` àquela respectiva flag na base de dados.

Esta abordagem performática atende a um volume expressivo de veículos caso carregados de uma única vez. Num cenário de API com paginação, essa mesma estrutura seria adaptada para refletir um objeto de `queryParams` enviado via serviço REST.
