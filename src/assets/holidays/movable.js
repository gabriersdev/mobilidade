import moment from "moment";
import {dateConfigs} from "../../assets/resources.js";

moment.locale(dateConfigs.lang)

/** Easter calculation (Anonymous Gregorian algorithm)
 * @param year {number}
 * @return {{month: number, day: number}}
 */
function getEasterDate(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
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
  if (!year) year = +moment().get("year");
  const easter = getEasterDate(year);
  return [{name: "Carnaval", ...addDaysToDate(year, easter, -47)}, {name: "Sexta-feira Santa", ...addDaysToDate(year, easter, -2)}, {name: "Páscoa", ...easter}, {name: "Corpus Christi", ...addDaysToDate(year, easter, 60)}];
}
