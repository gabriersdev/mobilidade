# Regras de Commit

Este documento descreve as regras de commit para o projeto.

## Padrão de Commits

Utilizamos o padrão [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) para as mensagens de commit. Isso nos ajuda a ter um histórico de commits mais legível e a automatizar a geração de changelogs.

O formato geral de uma mensagem de commit é:

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé opcional]
```

### Tipos de Commit

Os seguintes tipos são permitidos:

*   **feat**: Uma nova feature
*   **fix**: Uma correção de bug
*   **docs**: Mudanças na documentação
*   **style**: Mudanças que não afetam o significado do código (espaçamento, formatação, etc)
*   **refactor**: Uma mudança de código que não corrige um bug nem adiciona uma feature
*   **perf**: Uma mudança de código que melhora a performance
*   **test**: Adicionando testes ou corrigindo testes existentes
*   **chore**: Mudanças em build, dependências, etc.

## Hooks de Pré-Commit

Antes de cada commit, os seguintes hooks são executados:

1.  **Testes**: Todos os testes do projeto são executados para garantir que nenhuma regressão foi introduzida.
2.  **Linting da Mensagem de Commit**: A mensagem de commit é validada para garantir que ela segue o padrão Conventional Commits.
