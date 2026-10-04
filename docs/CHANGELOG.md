# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [Unreleased]
### Adicionado
- **Exceções de Operação**: Adicionado um sistema isolado em `src/assets/holidays/exceptions.js` que permite sobrescrever a classificação de um dia de operação específico (ex: "dia útil atípico"), dando total prioridade de escopo sobre as funções padrões de feriados e cálculo do dia da semana (`holiday-utils.js`).
