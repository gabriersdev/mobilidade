import moment from "moment";
import {nationalFixedHolidays} from "./national";
import {regionalFixedHolidays, municipalFixedHolidays, metropolitanFixedHolidays} from "./regional";
import {stateFixedHolidays} from "./state";
import {getMovableHolidays} from "./movable";

/**
 * getAllHolidays(year, options)
 * options: {
 *   includeRegion: string | null,
 *   includeNational: boolean (default true),
 *   includeMovable: boolean (default true),
 *   includeState: boolean (default true),
 *   includeMunicipal: boolean (default true),
 *   includeMetropolitan: boolean (default true)
 * }
 * returns sorted array by month/day
 */
export function getAllHolidays(year, options = {}) {
  const {
    includeRegion = null,
    includeNational = true,
    includeMovable = true,
    includeState = true,
    includeMunicipal = true,
    includeMetropolitan = true
  } = options;
  
  let holidays = [];
  
  if (includeNational) holidays = holidays.concat(nationalFixedHolidays);
  if (includeMovable) holidays = holidays.concat(getMovableHolidays(year));
  if (includeState) holidays = holidays.concat(stateFixedHolidays);
  if (includeMunicipal) holidays = holidays.concat(municipalFixedHolidays);
  if (includeMetropolitan) holidays = holidays.concat(metropolitanFixedHolidays);
  if (includeRegion && regionalFixedHolidays[includeRegion]) {
    holidays = holidays.concat(regionalFixedHolidays[includeRegion]);
  }
  
  // Deduplicate by name, month, day, scope
  const uniqueMap = new Map();
  holidays.forEach(h => {
    const key = `${h.name}-${h.month}-${h.day}-${h.scope || ""}-${h.city || ""}`;
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, h);
    }
  });

  // Normalize to include year for easy usage and sort
  const normalized = Array.from(uniqueMap.values()).map(h => ({
    name: h.name,
    month: h.month,
    day: h.day,
    scope: h.scope || "national",
    state: h.state,
    city: h.city,
    lineIds: h.lineIds,
    scheduleTarget: h.scheduleTarget || "domingo",
    date: moment(`${year}-${("0" + h.month).slice(-2)}-${("0" + h.day).slice(-2)}T00:00:00-03:00`)
  }));
  
  normalized.sort((a, b) => a.date - b.date);
  
  return normalized;
}

export * from './national';
export * from './state';
export * from './regional';
export * from './movable';
export * from './vacations';
export * from './facultative-operation-days.js';
export * from './exceptions.js';

