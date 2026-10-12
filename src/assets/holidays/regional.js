import {holidaysForAllScopes} from "./national.js";

// Municipal fixed-date holidays
export const municipalFixedHolidays = [
  {
    name: "Aniversário de Sabará",
    month: 7,
    day: 17,
    city: "Sabará",
    scope: "municipal",
    scheduleTarget: "domingo"
  },
  {
    name: "Nossa Senhora da Conceição",
    month: 12,
    day: 8,
    city: "Sabará",
    scope: "municipal",
    scheduleTarget: "domingo"
  },
  {
    name: "Assunção de Nossa Senhora",
    month: 8,
    day: 15,
    city: "Belo Horizonte",
    scope: "municipal",
    scheduleTarget: "domingo"
  },
  {
    name: "Imaculada Conceição",
    month: 12,
    day: 8,
    city: "Belo Horizonte",
    scope: "municipal",
    scheduleTarget: "domingo"
  },
  {
    name: "Aniversário de Belo Horizonte",
    month: 12,
    day: 12,
    city: "Belo Horizonte",
    scope: "municipal",
    scheduleTarget: "domingo"
  }
];

// Metropolitan fixed-date holidays (e.g. holiday in capital impacts metropolitan intercity lines)
export const metropolitanFixedHolidays = [
  {
    name: "Assunção de Nossa Senhora (Belo Horizonte)",
    month: 8,
    day: 15,
    city: "Belo Horizonte",
    scope: "metropolitan",
    scheduleTarget: "sábado"
  },
  {
    name: "Imaculada Conceição (Belo Horizonte)",
    month: 12,
    day: 8,
    city: "Belo Horizonte",
    scope: "metropolitan",
    scheduleTarget: "sábado"
  }
];

// Container for regional fixed-date holidays, keyed by legacy region code string for backward compatibility
export const regionalFixedHolidays = {
  "SC04": [
    {name: "Aniversário de Sabará", month: 7, day: 17, city: "Sabará", scope: "municipal", scheduleTarget: "domingo"},
    ...holidaysForAllScopes
  ],
  "SC03": [
    {name: "Aniversário de Belo Horizonte", month: 8, day: 15, city: "Belo Horizonte", scope: "municipal", scheduleTarget: "domingo"},
    ...holidaysForAllScopes
  ],
};

