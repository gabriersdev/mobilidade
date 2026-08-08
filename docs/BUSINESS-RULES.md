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
- **Mapeamento de Termos de Busca (Tipos de Linha):** O tipo de linha obtido dos dados brutos é normalizado para termos específicos para otimizar as buscas no sistema. Regra de conversão (insensível a maiúsculas/minúsculas): tipos contendo "executivo" são buscados como "Executivo"; "seletivo" como "Bandeirante"; e "coletivo" como "Coletivo". Se não corresponder a esses, o tipo original é mantido.
- **Exibição de Previsões (Rastreador em Tempo Real):** No modo de acompanhamento ao vivo, a exibição de próximos horários (informações adicionais) varia conforme o estado do veículo. Se o horário corrente for de **Partida/Saída** (indicado por `order_departure_point == 1`), a interface exibe *apenas* as próximas previsões de partida. Se for de **Aproximação** (demais pontos da rota), a interface exibe *apenas* as próximas previsões de aproximação.
- **Sugestão de Horários (Bus Times Display):** Para garantir uma transição visual mais suave na interface, o componente de exibição de horários deve apresentar um atraso artificial de 3 segundos no estado de carregamento inicial (exibindo placeholders responsivos independentemente da latência da API). As sugestões de horários são limitadas às 3 próximas viagens, exibindo "agora" para diferenças de tempo iguais ou menores que zero, e diferenciando a ação de partida ("sai") para pontos iniciais e de aproximação ("aprox.") para os demais pontos da rota.
- **Recarregamento de Componentes Assíncronos (Mapas/Iframes):** Sempre que houver ação explícita de recarregamento de iframes (como o mapa ao vivo), o componente deve forçar sua remontagem e reativar imediatamente o estado de carregamento no componente pai. Isso garante que o placeholder (skeleton) seja exibido novamente até que o novo conteúdo conclua o carregamento, provendo feedback visual adequado ao usuário sobre a ação.
- **Manipulação de Datas e Fuso Horário Local:** Diversos recursos da aplicação retornam datas do backend marcadas como UTC (terminadas em `Z`), mas que semanticamente pertencem ao fuso horário local (`-03:00`). O processamento dessas datas não deve realizar modificação direta do identificador `Z` nas strings (como um simples `replace`), pois isso resulta em cálculos de fuso inconsistentes no navegador, podendo alterar o dia da ocorrência do evento. O parse de datas deve utilizar obrigatoriamente a função utilitária global `Util.safeParseDate`, que fixa nativamente o offset (timezone) com auxílio do `moment.parseZone()`.


## Regras de Armazenamento Local e Cache

- **Isolamento de Dados do Aplicativo:** Para garantir que os dados armazenados (como histórico de pesquisas, configurações do usuário e preferências de interface) não entrem em conflito com outras instâncias ou projetos rodando no mesmo ambiente, todas as chaves de `localStorage` e `sessionStorage` devem ter o prefixo `mobilidade-app-` seguido do nome descritivo (em `kebab-case`).
- O gerenciamento destes dados armazenados pelos usuários deve ser possibilitado de forma transparente e em lote através da interface da aplicação.

## Regras de Relatórios e Análises

- Descreva os relatórios e análises que a aplicação gera.
- Descreva as métricas e os KPIs que são rastreados.
