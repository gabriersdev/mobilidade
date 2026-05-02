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
 * @return {[{name: string, month: number, day: number},{name: string, month: number, day: number},{name: string, month: number, day: number},{name: string, month: number, day: number}]} array of movable holidays based on Easter
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
