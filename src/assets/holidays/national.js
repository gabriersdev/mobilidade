export const nationalFixedHolidays = [
  {name: "Confraternização Universal", month: 1, day: 1, scope: "national", scheduleTarget: "domingo"},
  {name: "Tiradentes", month: 4, day: 21, scope: "national", scheduleTarget: "domingo"},
  {name: "Dia do Trabalhador", month: 5, day: 1, scope: "national", scheduleTarget: "domingo"},
  {name: "Independência do Brasil", month: 9, day: 7, scope: "national", scheduleTarget: "domingo"},
  {name: "Nossa Senhora Aparecida", month: 10, day: 12, scope: "national", scheduleTarget: "domingo"},
  {name: "Finados", month: 11, day: 2, scope: "national", scheduleTarget: "domingo"},
  {name: "Proclamação da República", month: 11, day: 15, scope: "national", scheduleTarget: "domingo"},
  {name: "Dia do Orgulho Negro", month: 11, day: 20, scope: "national", scheduleTarget: "domingo"},
  {name: "Natal", month: 12, day: 25, scope: "national", scheduleTarget: "domingo"}
];

export const holidaysForAllScopes = [
  // Varia de acordo com o ano
  {name: "Sexta-feira Santa", month: 4, day: 3, scope: "national", scheduleTarget: "domingo"},
  // A data invaria
  {name: "Assunção de Nossa Senhora", month: 12, day: 8, scope: "national", scheduleTarget: "domingo"},
  {name: "Véspera de Natal", month: 12, day: 24, scope: "national", scheduleTarget: "domingo"},
  {name: "Véspera de Ano Novo", month: 12, day: 31, scope: "national", scheduleTarget: "domingo"},
  // WARNING - lançado para que o sistema rode as previsões com o quadro de horários de sábado, já que este dia será ponto facultativo A PARTIR DAS 12H.
  {name: "Ponto facultativo: Jogo Brasil - Copa do Mundo 2026", month: 6, day: 29, scope: "national", scheduleTarget: "sábado"}
];

