import moment from "moment";

moment.locale("pt-BR");

// TODO - analisar se há a necessidade de exportar todas essas funções e constantes
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
  {name: "Assunção de Nossa Senhora", month: 12, day: 8},
  {name: "Véspera de Natal", month: 12, day: 24},
  {name: "Véspera de Ano Novo", month: 12, day: 31},
]

// Container for regional fixed-date holidays, keyed by region code string (e.g. "SP", "RJ", "MG", or "BH" / "município")
const regionalFixedHolidays = {
  "SC04": [
    {name: "Aniversário de Sabará", month: 7, day: 17},
    ...holidaysForAllScopes
  ],
  "SC03": [
    {name: "Aniversário de Belo Horizonte", month: 8, day: 15},
    ...holidaysForAllScopes
  ]
};

/**
 * addRegionalHoliday(regionCode: string, name: string, month: number, day: number)
 * @param regionCode {string} - use state sigla ("SP", "RJ") or "city:BH" for city-level (or qualquer string identificadora)
 * @param name {string}
 * @param month {number}
 * @param day {number}
 */
export function addRegionalHoliday(regionCode, name, month, day) {
  if (!regionalFixedHolidays[regionCode]) regionalFixedHolidays[regionCode] = [];
  regionalFixedHolidays[regionCode].push({name, month, day});
}

/** Easter calculation (Meets/Jones algorithm)
 * @param year {number}
 * @return {{month: number, day: number}}
 */
function getEasterDate(year) {
  const f = Math.floor;
  const G = year % 19;
  const C = f(year / 100);
  const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
  const I = (H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11))) % 30;
  const J = (year + f(year / 4) + H + 2 - C + f(C / 4)) % 7;
  const L = (I - J) % 7;
  const month = 3 + f((I + L + 40) / 44);
  const day = I + L + 28 - 31 * f(month / 4);
  return {month, day};
}

/**
 * Added days to date for generate full holiday date
 * @param year {number}
 * @param dateObj {{month: number, day: number}}
 * @param days {number}
 * @return {{month: number, day: number}}
 */
function addDaysToDate(year, dateObj, days) {
  const d = new Date(year, dateObj.month - 1, dateObj.day);
  d.setDate(d.getDate() + days);
  return {month: d.getMonth() + 1, day: d.getDate()};
}

/**
 * getMovableHolidays(year)
 * @param year {number}
 * @return {{name: string, props: object}} array of movable holidays based on Easter
 */
export function getMovableHolidays(year) {
  const easter = getEasterDate(year);
  return [
    {name: "Carnaval", ...addDaysToDate(year, easter, -47)},
    {name: "Sexta-feira Santa", ...addDaysToDate(year, easter, -2)},
    {name: "Páscoa", ...easter},
    {name: "Corpus Christi", ...addDaysToDate(year, easter, 60)}
  ];
}

/**
 * getAllHolidays(year, options)
 * options: { includeRegion: string | null, includeNational: boolean (default true), includeMovable: boolean (default true) }
 * returns sorted array by month/day
 */
export function getAllHolidays(year, options = {}) {
  const {
    includeRegion = null,
    includeNational = true,
    includeMovable = true
  } = options;
  
  let holidays = [];
  
  if (includeNational) holidays = holidays.concat(nationalFixedHolidays);
  if (includeMovable) holidays = holidays.concat(getMovableHolidays(year));
  if (includeRegion && regionalFixedHolidays[includeRegion]) holidays = holidays.concat(regionalFixedHolidays[includeRegion]);
  
  // Normalize to include year for easy usage and sort
  const normalized = holidays.map(h => ({
    name: h.name,
    month: h.month,
    day: h.day,
    date: moment(`${year}-${("0" + h.month).slice(-2)}-${("0" + h.day).slice(-2)}T00:00:00-03:00`)
  }));
  
  normalized.sort((a, b) => a.date - b.date);
  
  // Return without the raw Date object if you prefer, but date is convenient
  return normalized.map(({name, month, day, date}) => ({name, month, day, date}));
}

// Get holidays per scope
// const scope03Holidays2025 = getAllHolidays(2025, {includeRegion: "SC03"});
// const scope04Holidays2025 = getAllHolidays(2025, {includeRegion: "SC04"});
