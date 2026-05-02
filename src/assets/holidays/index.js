import moment from "moment";
import {nationalFixedHolidays} from "./national";
import {regionalFixedHolidays} from "./regional";
import {getMovableHolidays} from "./movable";

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

export * from './national';
export * from './regional';
export * from './movable';
export * from './vacations';
