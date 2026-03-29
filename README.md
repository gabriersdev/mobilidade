# Mobilidade

Projeto de mobilidade urbana focado em facilitar o acesso a informações sobre transporte público.

## Escopo de abrangência

Até o momento, o projeto atende principalmente as linhas de ônibus municipais da cidade de Sabará-MG.

## Funcionalidades

- **Busca de Linhas**: Pesquisa rápida e eficiente por linhas de ônibus.
- **Detalhes da Linha**:
  - Visualização dos horários de partida, incluindo observações de itinerários.
  - Destaque para os próximos horários do dia e partidas nos próximos 15 minutos.
  - Dados completos: Nome, origem/destino, tarifa, tipo (coletivo, executivo, etc.), abrangência, integração, concessionária e informações sobre acessibilidade.
  - Visualização de pontos de recarga e pontos de parada no mapa.
  - Sugestão de linhas similares.
- **Acompanhamento em Tempo Real (Live)**: Monitoramento da aproximação de ônibus em pontos de parada com base em estatísticas e previsibilidade.
- **Guia de Transporte**: Ferramenta para descobrir quais linhas atendem a determinados locais.
- **Notícias**: Atualizações sobre as linhas e o sistema de transporte.
- **Histórico**:
  - Histórico de quadros de horários antigos.
  - Histórico de alterações de tarifas.
  - Histórico de pontos de controle e partida.
- **Informações Institucionais e Locais**:
  - Informações sobre as empresas concessionárias.
  - Dados sobre a cidade de Sabará.
  - Manifesto do projeto.

## Páginas e Rotas

A aplicação utiliza `react-router-dom` para navegação. As principais rotas são:

- `/` - Página Inicial
- `/search` - Busca de linhas
- `/lines/:id?` - Detalhes e horários de uma linha específica
- `/live` - Monitoramento em tempo real
- `/guide` - Guia de transporte público
- `/news/:id?` - Notícias
- `/company/:id?` - Informações sobre concessionárias
- `/sabara` - Informações sobre Sabará
- `/history/departure-times/:id` - Histórico de horários de uma linha
- `/history/fares/:id` - Histórico de tarifas
- `/history/departure-points/:id` - Histórico de pontos de partida
- `/development` - Página de desenvolvimento
- `/manifest` - Manifesto do projeto
- `/terms-of-service` - Termos de serviço
- `/privacy` - Política de privacidade

## Tecnologias

- **Frontend**: React, Vite, React Router Dom
- **UI/UX**: React Bootstrap, Bootstrap Icons, Framer Motion, AOS (Animate On Scroll)
- **Mapas**: Leaflet, React-Leaflet
- **Requisições**: Axios
- **Testes**: Cypress
- **Outros**: Moment.js, hCaptcha

## Testes

- Para rodar testes E2E: `npx cypress run --e2e`
- Para rodar testes de componentes: `npx cypress run --component`
