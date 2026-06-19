import moment from 'moment';
import {getAllHolidays, getVacation} from "@/assets/holidays.js";

export function getTodayHolidayData(scope) {
  let codeScope;
  
  switch (typeof scope === "string" ? scope.toLowerCase() : scope) {
    case "metropolitano":
    case 2:
      codeScope = 4;
      break;
    case "municipal":
    case 1:
    default:
      codeScope = 3
      break;
  }
  
  const m = moment();
  const now = moment(`${m.get("year")}-${('0' + (m.get("month") + 1)).slice(-2)}-${('0' + m.get("date")).slice(-2)}T00:00:00-03:00`);
  
  let holidaysScope = getAllHolidays(now.year(), {includeRegion: `SC${('0' + codeScope).slice(-2)}`});
  return holidaysScope.find((h) => now.diff(h.date, "days") === 0);
}

export function getTodayVacationData() {
  const m = moment();
  const now = moment(`${m.get("year")}-${('0' + (m.get("month") + 1)).slice(-2)}-${('0' + m.get("date")).slice(-2)}T00:00:00-03:00`);
  
  return getVacation(now);
}

export function getCurrentDayGroupName(scope, consideringVacations) {
  if (getTodayHolidayData(scope)) return ['domingo'];
  
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
};
