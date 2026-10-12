import moment from "moment";

// National / general operation exceptions applicable across all lines and scopes
export const nationalExceptions = [
  {
    name: "Eleições 2026 - 1º Turno",
    year: 2026,
    month: 10,
    day: 4,
    groupName: "dia útil atípico",
    scope: "national"
  },
  {
    name: "Eleições 2026 - 2º Turno",
    year: 2026,
    month: 10,
    day: 25,
    groupName: "dia útil atípico",
    scope: "national"
  }
];

export const regionalExceptions = {
  "SC04": [
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
  const {
    includeRegion = null,
    includeNational = true
  } = options;
  let exceptions = [];

  if (includeNational) {
    exceptions = exceptions.concat(nationalExceptions);
  }

  if (includeRegion && regionalExceptions[includeRegion]) {
    // Evita duplicatas caso a exceção nacional já cubra
    const regionalList = regionalExceptions[includeRegion].filter(
      r => !exceptions.some(e => e.month === r.month && e.day === r.day && (!r.year || e.year === r.year))
    );
    exceptions = exceptions.concat(regionalList);
  }

  // Filtrar apenas do ano atual ou exceções recorrentes (sem ano definido)
  const filtered = exceptions.filter(e => !e.year || e.year === year);

  return filtered.map(e => ({
    name: e.name,
    month: e.month,
    day: e.day,
    year: e.year || year,
    groupName: e.groupName,
    scope: e.scope || (includeRegion ? "regional" : "national"),
    city: e.city,
    lineIds: e.lineIds,
    date: moment(`${year}-${("0" + e.month).slice(-2)}-${("0" + e.day).slice(-2)}T00:00:00-03:00`)
  }));
}

