# Regras de Negócio

Este documento descreve as regras de negócio do projeto de mobilidade.

## Visão Geral

Esta seção fornece uma visão geral de alto nível das regras de negócio da aplicação.

<!--  TODO: adicionar conteúdo conforme o projeto -->

## Regras de Autenticação e Autorização

- Descreva quem pode acessar a aplicação.
- Descreva os diferentes papéis e permissões.

## Regras de Validação de Dados

- Descreva as regras de validação para as entradas do usuário.
- Descreva os formatos de dados esperados.

## Regras de Lógica de Negócio

- Descreva os principais processos de negócio que a aplicação suporta.
- Descreva os fluxos de trabalho e as transições de estado.
- **Recomendação de Linhas Similares:** O algoritmo que sugere linhas similares utiliza um sistema de pontuação avançado que emprega pesos dinâmicos de frequência (TF-IDF adaptado). Pontos de partida/destino mais raros (bairros locais) possuem um peso muito maior do que localidades muito comuns (como "Belo Horizonte" ou Terminais). A pontuação é complementada caso pertençam à mesma concessionária e pela proximidade numérica das linhas.
- **Repositório de Veículos:** Veículos devem possuir registros claros de suas datas de entrada e saída na operação (status ativo e histórico). As datas de início e término (`operationStartDate`, `operationEndDate`) devem basear os relatórios e a cronologia do histórico de cada frota.

## Regras de Relatórios e Análises

- Descreva os relatórios e análises que a aplicação gera.
- Descreva as métricas e os KPIs que são rastreados.
