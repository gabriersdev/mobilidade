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

export function diffToHuman(date) {
  const now = moment();
  const target = moment(date);
  
  if (!target.isValid()) return 'Data inválida';
  
  const diffSeconds = target.diff(now, 'seconds');
  const absDiff = Math.abs(diffSeconds);
  
  if (diffSeconds > 0) {
    if (absDiff < 60) return 'em alguns segundos';
    if (absDiff < 3600) return `em ${target.diff(now, 'minutes')} minuto${target.diff(now, 'minutes') > 1 ? "s" : ""}`;
    if (absDiff < 86400) return `em ${target.diff(now, 'hours')} hora${target.diff(now, 'hours') > 1 ? "s" : ""}`;
    if (absDiff < (86400 * 30)) return `em ${target.diff(now, 'days')} dia${target.diff(now, 'days') > 1 ? "s" : ""}`;
    return `${target.format('DD/MM/YYYY')}`;
  }
  
  if (absDiff < 60) return 'há alguns segundos';
  if (absDiff < 3600) return `há ${now.diff(target, 'minutes')} minuto${now.diff(target, 'minutes') > 1 ? "s" : ""}`;
  if (absDiff < 86400) return `há ${now.diff(target, 'hours')} hora${now.diff(target, 'hours') > 1 ? "s" : ""}`;
  if (absDiff < (86400 * 30)) return `há ${now.diff(target, 'days')} dia${now.diff(target, 'days') > 1 ? "s" : ""}`;
  return `${target.format('DD/MM/YYYY')}`;
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
