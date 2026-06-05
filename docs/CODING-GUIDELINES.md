# Diretrizes de Codificação

Este documento fornece diretrizes de codificação para o projeto.

## Nomenclatura de Arquivos

- Utilize sempre que possível os nomes dos arquivos em inglês US.
- Componentes: `lower-case.tsx` (ex: `lower-case.jsx`)
- Estilos: `kebab-case.css` (ex: `my-component.css`)
- Utilitários: `lower-case.ts` (ex: `utility.js`)

## Organização de Arquivos

- Utilize sempre que possível os nomes das rotas e pastas em inglês US.
- Componentes: `src/components/`
- Estilos: `src/styles/`
- Utilitários: `src/libs/`
- Tipos: `src/types/`
- Páginas: `/src/pages/[nome-da-pagina]/[nome-do-arquivo]` e importar em `src/app-router.jsx`

## Padrões de Código

- Use `eslint` para garantir a consistência do código.
- Use `prettier` para formatação de código.
- Siga as diretrizes de nomenclatura de arquivos.
- Adicione testes para novos recursos (testes de componentes usando o `cypress`) OU no caso de novas páginas criadas, criar testes de componentes de páginas (com `e2e` e usando `cypress`).

## Observações:

- Para criar um componente deve-se sempre que possível usar componentes do React Bootstrap ou do próprio Bootstrap, que é o que o projeto usa como UI.
- Utilizar sempre que for possível as classes que já vem no Bootstrap para criar componentes.
- Evitar o máximo possível, de criar classes personalizadas, sempre optando pelas classes que já vem com o Bootstrap.
- Para o caso de uma estilização como Flexbox ou Grid, criar um componente que centralize estes estilos.
- Optar sempre por quebrar os grandes componentes (PRINCIPALMENTE aqueles com mais de 100 linhas) em outros componentes, e, importar estes no componente "pai" que antes continha o código deles.
- Seguir a risca os padrões de código, a arquitetura usada dentre outros critérios aqui definidos para criar um código sempre uniforme e coeso, de acordo com aqueles que já existiam.
- Usar sempre que possível, use `const` para definir uma nova variável.
- Usar a palavra reservada `function` em vez de `const` para criar uma nova função.
- Optar por sempre usar os `hooks` do `React` para definir dados e otimizar o funcionamento e execução do código.
- Optar por sempre utilizar `libs` já existentes para projetos `React`, desde que essas sejam perfomáticas, coesas, bem documentadas e já conhecidas no meio de desenvolvimento `front-end`.
- Para situações que for necessário iterar sobre um array de valores estáticos, faça a criação um arquivo a parte, em `resources`, seguindo o [padrão de nomenclatura definidos](#nomenclatura-de-arquivos), utilizando a linguagem `typescript`, além de tipar as estruturas de dados.
- Desenvolver pensando sempre no "padrão de desenvolvimento" `clean code` e em criar componentes performáticos, usando padrões já conhecidos, como a iteração, evitar duplicidade de código (componentização/criação de arquivos em `utils`),
- Documentar os blocos de códigos mais complexos, que usarem de recursos pouco conhecidos ou que tenham lógica invertida (fora do fluxo: verificação se `true`, execução do bloco E verificação de `elseif`, execução do bloco OU verificação de `else` OU `easy return`) ou que dependem da ação de outro componente, arquivo ou código, que não é explícita (por exemplo, no caso de algum componente depender de uma ação em outro via DOM, sendo que esta dependência não seja clara).
- Evitar a "poluição visual do código", quando há comentários de documentação excessivos (sempre avalie a necessidade do comentário e a utilidade dele no futuro).
- Evitar, sempre que possível, fazer um código com complexidade muito alta (complexidade de algorítmo O(n), O(n²), dentre outros).
- Evitar, sempre que possível, múltipas renderizações, seja `refresh` de página ou uso de intervalos para execução de blocos de códigos.
- Evitar, sempre que possível, desenvolver `loops` pesados, que, para funcionar precisam da execução de outros loops ou de requisições externas (seja à `APIs` ou banco de dados).
- Utilize sempre que possível os nomes dos componentes e variáveis em inglês US.
