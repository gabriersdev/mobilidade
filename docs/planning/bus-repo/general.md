# Repositório de Ônibus: Veículos e Operadoras

## 1. Visão Geral e Objetivo

O objetivo desta funcionalidade é centralizar informações detalhadas sobre a frota de veículos de ônibus que atendem às linhas da RIT 4 e outras áreas cobertas pelo projeto.

Este repositório servirá como uma base de conhecimento para administradores, colaboradores e usuários, permitindo o registro e a consulta de dados técnicos, operacionais e históricos de cada veículo.

### Aplicando o Princípio da Coesão

No desenvolvimento de software, **coesão** refere-se à organização de funcionalidades relacionadas em uma unidade lógica e focada. Aplicamos este princípio da seguinte forma:
- **Coesão do Módulo:** O repositório de ônibus será um módulo coeso, focado exclusivamente em gerenciar informações sobre os veículos. Ele não se preocupará com o rastreamento em tempo real ou o gerenciamento de linhas, que são responsabilidades de outros módulos.
- **Coesão Funcional:** Cada função dentro deste módulo terá uma única responsabilidade, como `buscarVeiculoPorPlaca()` ou `registrarIncidente()`.

## 2. Fontes de Dados

As informações serão populadas e mantidas através das seguintes fontes:

- **Integração Inicial:** Dados técnicos dos veículos serão importados de repositórios abertos (ex: Ônibus Brasil) para criar a base inicial.
- **Manutenção Administrativa:** A equipe de administração do projeto será responsável por validar e manter a precisão das informações.
- **Contribuição da Comunidade:** Usuários e colaboradores poderão sugerir atualizações ou reportar inconsistências, que serão revisadas e aprovadas pelos administradores.

## 3. Modelo de Dados do Veículo

Cada veículo no repositório será representado pela seguinte estrutura de dados:

### Identificação e Status
- **Placa:** Identificador único (e.g., `O1N3E09`).
- **Identificação da Frota:** Código interno da empresa (e.g., `44089`).
- **Status:** `Em atividade`, `Substituído`, `Desativado`, `Em manutenção`, `Desconhecido`.
- **Empresa Proprietária:** (e.g., `Viação Cuiabá`).
- **Geração/Leva:** Agrupamento de aquisição (e.g., `Renovação Viação Cuiabá - FEV 2018`).

### Especificações Técnicas
- **Fabricante do Chassi:** (e.g., `Mercedes Benz`).
- **Modelo do Chassi:** (e.g., `OF-1721`).
- **Encarroçadora:** (e.g., `Marcopolo`).
- **Modelo da Carroceria:** (e.g., `Mega Plus`).
- **Ano/Modelo:** (e.g., `2017/2018`).
- **Dimensão:** (e.g., `Carroceria de 11 metros`).
- **Tecnologia de Otimização:** (e.g., `Bluetec 5`).

### Características de Conforto e Acessibilidade
- **Capacidade:** `Sentados: 39`, `Em pé: 35`.
- **Ar Condicionado:** `Sim`/`Não`.
- **Suspensão a Ar:** `Sim`/`Não`.
- **Tipo de Piso:** (e.g., `Taraflex`).
- **Tipo de Banco:** (e.g., `Acolchoado`).
- **Wi-Fi:** `Sim`/`Não`.
- **Acessibilidade - elevador** (e.g., `Elevador para cadeira de rodas`).
- **Acessibilidade - bancos exclusivos** (e.g., `Possui assentos exclusivos`).
- **Acessibilidade - contraste visual** (e.g., `Possui contraste visual entre os componentes do veículo`).
- **Acessibilidade - porta desembarque** (e.g., `Possui ao menos uma porta para desembarque`).
- **Quantidade de Portas:** (e.g., `3`).

### Histórico e Operação
- **Linhas Operadas:** Registro das linhas onde o veículo já operou (e.g., `4988`, `4989`).
- **Estado de Conservação:** `Excelente`, `Bom`, `Regular`, `Ruim`, `Precário`.
- **Histórico de Incidentes:**
    - **Acidentes:** (e.g., `Batida leve em Junho de 2026: laceração lateral`).
    - **Defeitos Mecânicos:** (e.g., `Estouro de pneu em Maio de 2019`).
    - **Vandalismo/Depreciação:** (e.g., `12 assentos reformados por vandalismo`).
- **Histórico de Manutenção:** Registros de substituições e desativações.
- **Observações Gerais:** Campo de texto livre para informações pertinentes.

## 4. Funcionalidades da Interface

A interface de usuário permitirá as seguintes ações:

- **Página de Listagem:** Exibirá todos os veículos em um formato de lista, semelhante à listagem de linhas.
- **Pesquisa e Filtros:** Os usuários poderão pesquisar veículos por placa, empresa, modelo ou linha. Filtros avançados permitirão refinar a busca por características como "possui ar condicionado" ou "status em atividade".
- **Página de Detalhes:** Cada veículo terá uma página dedicada exibindo todas as informações do modelo de dados, incluindo seu histórico de incidentes e manutenção.
