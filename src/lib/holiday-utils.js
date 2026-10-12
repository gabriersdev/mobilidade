import moment from 'moment';
import {getAllHolidays, getVacation} from "@/assets/holidays.js";
import {getAllExceptions} from "@/assets/holidays/exceptions.js";

/**
 * Normalizes text removing accents, lowercase and trimming.
 * @param {string|any} text
 * @returns {string}
 */
function normalizeText(text) {
  if (!text) return "";
  return String(text).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

/**
 * Checks whether an event (holiday or exception) applies to a line or target.
 * @param {Object} event
 * @param {Object|number|string|null|undefined} target
 * @returns {boolean}
 */
export function isEventApplicableToLine(event, target) {
  // National or universal events apply to all lines
  if (!event.scope || event.scope === "national" || event.scope === "all") {
    return true;
  }

  // If no target is passed, only universal/national events apply
  if (!target) {
    return false;
  }

  // Extract line attributes supporting both object and primitive types
  let lineId = null;
  let lineScopeNum = null;
  let departureLoc = "";
  let destinationLoc = "";

  if (typeof target === "object") {
    lineId = target.line_id || target.id || target.line_number || null;
    lineScopeNum = target.scope !== undefined ? Number(target.scope) : null;
    departureLoc = normalizeText(target.departure_location);
    destinationLoc = normalizeText(target.destination_location);
  } else if (typeof target === "number") {
    lineScopeNum = target;
  } else if (typeof target === "string") {
    const lower = target.toLowerCase();
    if (lower === "metropolitano" || lower === "2") lineScopeNum = 2;
    else if (lower === "municipal" || lower === "1") lineScopeNum = 1;
  }

  // 1. Explicit line matching by lineIds array
  if (Array.isArray(event.lineIds) && event.lineIds.length > 0) {
    if (lineId && event.lineIds.some((id) => String(id) === String(lineId))) {
      return true;
    }
  }

  // 2. State-level scope matching
  if (event.scope === "state") {
    // Default system state is MG
    if (!event.state || event.state.toUpperCase() === "MG") {
      return true;
    }
    return false;
  }

  // 3. Municipal-level scope matching
  if (event.scope === "municipal") {
    const eventCity = normalizeText(event.city);

    // If line has departure or destination location matching city
    if (departureLoc || destinationLoc) {
      if (departureLoc.includes(eventCity) || destinationLoc.includes(eventCity)) {
        return true;
      }
    }

    // Fallback: If only numeric scope 1 (Municipal) was provided and city is Sabará (core municipal system)
    if (lineScopeNum === 1 && eventCity.includes("sabara")) {
      return true;
    }

    return false;
  }

  // 4. Metropolitan-level scope matching
  if (event.scope === "metropolitan") {
    // Matches if the line has regulatory scope 2 (Metropolitano)
    if (lineScopeNum === 2) {
      if (event.city) {
        const eventCity = normalizeText(event.city);
        if (departureLoc || destinationLoc) {
          return departureLoc.includes(eventCity) || destinationLoc.includes(eventCity);
        }
      }
      return true;
    }
    return false;
  }

  return false;
}

/**
 * Returns today's holiday data applicable to the given line or scope.
 * @param {Object|number|string|null} [target]
 * @returns {Object|undefined}
 */
export function getTodayHolidayData(target) {
  const m = moment();
  const now = moment(`${m.get("year")}-${('0' + (m.get("month") + 1)).slice(-2)}-${('0' + m.get("date")).slice(-2)}T00:00:00-03:00`);

  const allHolidays = getAllHolidays(now.year());
  const todayHolidays = allHolidays.filter((h) => now.diff(h.date, "days") === 0);

  if (todayHolidays.length === 0) return undefined;

  // Find the most specific holiday applicable to the target (line-specific > municipal/metropolitan > state > national)
  const priorityOrder = { line: 1, municipal: 2, metropolitan: 3, state: 4, national: 5 };

  const applicableHolidays = todayHolidays.filter((h) => isEventApplicableToLine(h, target));
  applicableHolidays.sort((a, b) => (priorityOrder[a.scope] || 99) - (priorityOrder[b.scope] || 99));

  return applicableHolidays[0];
}

/**
 * Returns today's vacation data if active.
 * @returns {Object|undefined}
 */
export function getTodayVacationData() {
  const m = moment();
  const now = moment(`${m.get("year")}-${('0' + (m.get("month") + 1)).slice(-2)}-${('0' + m.get("date")).slice(-2)}T00:00:00-03:00`);

  return getVacation(now);
}

/**
 * Returns today's exception data applicable to the given line or scope.
 * @param {Object|number|string|null} [target]
 * @returns {Object|undefined}
 */
export function getTodayExceptionData(target) {
  const m = moment();
  const now = moment(`${m.get("year")}-${('0' + (m.get("month") + 1)).slice(-2)}-${('0' + m.get("date")).slice(-2)}T00:00:00-03:00`);

  const allExceptions = getAllExceptions(now.year(), {includeNational: true});
  const todayExceptions = allExceptions.filter((e) => now.diff(e.date, "days") === 0);

  if (todayExceptions.length === 0) return undefined;

  return todayExceptions.find((e) => isEventApplicableToLine(e, target));
}

/**
 * Determines current day group name (e.g. ['domingo'], ['sábado'], ['dia útil atípico'])
 * taking into account operational exceptions, holidays, and vacations.
 * @param {Object|number|string|null} [target]
 * @param {boolean} [consideringVacations]
 * @returns {string[]}
 */
export function getCurrentDayGroupName(target, consideringVacations) {
  // 1. Operational Exceptions have top priority
  const exception = getTodayExceptionData(target);

  if (exception) {
    if ([null, undefined, true].includes(consideringVacations)) {
      const vacation = getTodayVacationData();
      if (vacation) return [exception.groupName, 'ferias'];
    }
    return [exception.groupName];
  }

  // 2. Holidays
  const holiday = getTodayHolidayData(target);
  if (holiday) {
    const targetSchedule = holiday.scheduleTarget || 'domingo';
    if ([null, undefined, true].includes(consideringVacations)) {
      const vacation = getTodayVacationData();
      if (vacation) return [targetSchedule, 'ferias'];
    }
    return [targetSchedule];
  }

  // 3. Regular day of the week
  function theDayIs() {
    switch (moment().get("day")) {
      case 0:
        return 'domingo';
      case 6:
        return 'sábado';
      default:
        return 'dia útil';
    }
  }

  if ([null, undefined, true].includes(consideringVacations)) {
    const vacation = getTodayVacationData();
    if (vacation) return [theDayIs(), 'ferias'];
    return [theDayIs()];
  }

  return [theDayIs()];
}

