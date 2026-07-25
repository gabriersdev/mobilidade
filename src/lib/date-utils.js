import moment from 'moment';
import {dateConfigs} from "@/assets/resources.js";

moment.locale(dateConfigs.lang);

export function formatTime(time, format) {
  const date = moment(time).format(format)
  if (date !== "Invalid date") return date
}

export function translateMonth(month) {
  const o = {
    "january": "janeiro",
    "february": "fevereiro",
    "march": "março",
    "april": "abril",
    "may": "maio",
    "june": "junho",
    "july": "julho",
    "august": "agosto",
    "september": "setembro",
    "october": "outubro",
    "november": "novembro",
    "december": "dezembro",
  }
  
  return o[month] || month;
}

export function diffToHuman(argOne, argTwo, amigableHighDiffs) {
  if (typeof argTwo === 'boolean') {
    amigableHighDiffs = argTwo;
    argTwo = undefined;
  }

  const lastDate = argTwo ? moment(argOne) : moment();
  const initDate = argTwo ? moment(argTwo) : moment(argOne);
  
  if (!initDate.isValid()) return 'Data inválida';
  
  const diffSeconds = initDate.diff(lastDate, 'seconds');
  const absDiff = Math.abs(diffSeconds);
  const isFuture = diffSeconds > 0;
  
  const prefix = isFuture ? 'em' : 'há';
  
  const format = (unit, name, pluralName) => {
    const value = Math.abs(initDate.diff(lastDate, unit));
    return `${prefix} ${value} ${value > 1 ? pluralName : name}`;
  };
  
  if (absDiff < 60) return `${prefix} alguns segundos`;
  if (absDiff < 3600) return format('minutes', 'minuto', 'minutos');
  if (absDiff < 86400) return format('hours', 'hora', 'horas');
  if (absDiff < (86400 * 30)) return format('days', 'dia', 'dias');
  
  if (amigableHighDiffs) {
    const diffMonths = Math.abs(initDate.diff(lastDate, 'months'));
    if (diffMonths < 1) return format('days', 'dia', 'dias');
    if (diffMonths < 12) return format('months', 'mês', 'meses');
    return format('years', 'ano', 'anos');
  }
  
  return `${initDate.format('DD/MM/YYYY')}`;
}

export function translateWeekDay(weekDay, props) {
  const days = {
    "sunday": "domingo",
    "monday": "segunda" + (props?.suffix ? "-feira" : ""),
    "tuesday": "terça" + (props?.suffix ? "-feira" : ""),
    "wednesday": "quarta" + (props?.suffix ? "-feira" : ""),
    "thursday": "quinta" + (props?.suffix ? "-feira" : ""),
    "friday": "sexta" + (props?.suffix ? "-feira" : ""),
    "saturday": "sábado"
  };
  
  return days[weekDay.toLowerCase()] || weekDay;
}

export function parseDatetimeTimezone(d) {
  return {
    ...d,
    "departure_time_trip": parseInt(import.meta.env?.["VITE_MODE"], 10) === 0 ? d?.["departure_time_trip"].replace("Z", "-03:00") : d?.["departure_time_trip"],
    "expected_arrival_time": parseInt(import.meta.env?.["VITE_MODE"], 10) === 0 ? d?.["expected_arrival_time"].replace("Z", "-03:00") : d?.["expected_arrival_time"],
  }
}
