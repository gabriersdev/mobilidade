import moment from "moment";

export const regionalExceptions = {
  "SC04": [
    // Exemplo: { name: "Sábado com horário de dia útil atípico", year: 2026, month: 1, day: 25, groupName: "dia útil atípico" }
    {
      name: "Eleições 2026 - 1º Turno",
      year: 2026,
      month: 10,
      day: 4,
      groupName: "dia útil atípico"
    },
    {
      name: "Eleições 2026 - 2º Turno",
      year: 2026,
      month: 10,
      day: 25,
      groupName: "dia útil atípico"
    }
  ],
  "SC03": [
    // Exemplo: { name: "Sábado com horário de dia útil atípico", year: 2026, month: 1, day: 25, groupName: "dia útil atípico" }
    {
      name: "Eleições 2026 - 1º Turno",
      year: 2026,
      month: 10,
      day: 4,
      groupName: "dia útil atípico"
    },
    {
      name: "Eleições 2026 - 2º Turno",
      year: 2026,
      month: 10,
      day: 25,
      groupName: "dia útil atípico"
    }
  ]
};

export function getAllExceptions(year, options = {}) {
  const { includeRegion = null } = options;
  let exceptions = [];

  if (includeRegion && regionalExceptions[includeRegion]) {
    exceptions = exceptions.concat(regionalExceptions[includeRegion]);
  }

  // Filtrar apenas do ano atual ou exceções recorrentes (sem ano definido)
  const filtered = exceptions.filter(e => !e.year || e.year === year);

  return filtered.map(e => ({
    name: e.name,
    month: e.month,
    day: e.day,
    groupName: e.groupName,
    date: moment(`${year}-${("0" + e.month).slice(-2)}-${("0" + e.day).slice(-2)}T00:00:00-03:00`)
  }));
}
