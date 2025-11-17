# Mobilidade

Projeto de mobilidade.

## Escopo de abrangência

Até o momento, o projeto atende apenas as linhas de ônibus municipais da cidade de Sabará-MG.

## Funcionalidades

- Buscar por uma linha
- Visualizar os horários de partida da linha
  - Os horários podem ter itinerários diferentes, sendo necessário visualizar as observações dos horários de partida
  - Ver com precisão os próximos horários do dia e os que partirão nos próximos 15 minutos
- Visualizar os dados da linha:
  - Nome
  - Local de partida e destino
  - Tarifa
  - Tipo (coletivo, executivo, etc.)
  - Abrangência (municipal, metropolitano, rodoviário, etc.)
  - Se possui integração ou não
  - Concessionária
  - Informações sobre conforto e acessibilidade
- Visualizar os pontos de recarga da linha
- Visualizar os pontos de parada da linha
- Visualizar linhas similares à linha consultada
- Notícias sobre as linhas
- Acompanhar ao vivo a aproximação de ônibus em pontos de parada, de acordo com estatísticas e critérios de previsibilidade
- Visualizar quais linhas passam em X lugar, através do Guia de Transporte Público

## Tecnologias

- React
- MySQL, MySQL Workbench, PHPMyAdmin
- React-bootstrap
- Axios
- Express
- Node.js
- Leaflet
- Weather API
- Cypress
- hCaptcha

## Testes 

- Para rodar testes E2E: `npx cypress run --e2e`
- Para rodar testes de componentes: `npx cypress run --component`
