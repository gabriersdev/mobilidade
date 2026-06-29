export const nationalFixedHolidays = [
  {name: "Confraternização Universal", month: 1, day: 1},
  {name: "Tiradentes", month: 4, day: 21},
  {name: "Dia do Trabalhador", month: 5, day: 1},
  {name: "Independência do Brasil", month: 9, day: 7},
  {name: "Nossa Senhora Aparecida", month: 10, day: 12},
  {name: "Finados", month: 11, day: 2},
  {name: "Proclamação da República", month: 11, day: 15},
  {name: "Dia do Orgulho Negro", month: 11, day: 20},
  {name: "Natal", month: 12, day: 25}
];

export const holidaysForAllScopes = [
  // Varia de acordo com o ano
  {name: "Sexta-feira Santa", month: 4, day: 3},
  // A data invaria
  {name: "Assunção de Nossa Senhora", month: 12, day: 8},
  {name: "Véspera de Natal", month: 12, day: 24},
  {name: "Véspera de Ano Novo", month: 12, day: 31},
  // WARNING - lançando AQUI para que o sistema rode as previsões com o quadro de horários de sábado, já que este dia será ponto facultativo A PARTIR DAS 12H. Contudo, não há validação nem tratamento no sistema para que ele interprete a mudança de horário...
  {name: "Ponto facultativo: Jogo Brasil - Copa do Mundo 2026", month: 6, day: 29},
];
