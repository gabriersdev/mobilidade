import moment from "moment";
import {getMovableHolidays} from "./movable.js";
import {holidaysForAllScopes, nationalFixedHolidays} from "./national.js";
import {regionalFixedHolidays} from "./regional.js";
import {dateConfigs} from "../../assets/resources.js";

moment.locale(dateConfigs.lang)

/**
 * Identifica dias de operação facultativa (pontes) baseados nos feriados do ano.
 * Uma "ponte" é um dia útil que se encontra entre um feriado e um fim de semana.
 *
 * @param {number} year O ano para o qual os dias facultativos serão calculados.
 * @param {string|null} region O código da região para incluir feriados regionais (opcional).
 * @returns {Array<{name: string, month: number, day: number, holidayRelated: string, weekDayName: string}>} Uma lista de dias facultativos.
 */
function getFacultativeOperationDays(year, region = null) {
  // Obtém os feriados móveis (baseados na Páscoa) para o ano especificado.
  const movableHolidays = getMovableHolidays(year);
  
  // Agrupa os feriados fixos nacionais e de escopo geral.
  let fixedHolidays = [...nationalFixedHolidays, ...holidaysForAllScopes];
  
  // Se uma região for especificada e houver feriados para ela, adiciona-os à lista.
  if (region && regionalFixedHolidays[region]) {
    fixedHolidays = fixedHolidays.concat(regionalFixedHolidays[region]);
  }
  
  // Combina todos os feriados (móveis e fixos) em uma única lista, convertendo as datas para objetos moment.
  const allHolidays = movableHolidays
    .map(h => ({...h, date: moment({year, month: h.month - 1, day: h.day})}))
    .concat(fixedHolidays.map(h => ({...h, date: moment({year, month: h.month - 1, day: h.day})})));
  
  const facultativeDays = [];
  
  // Itera sobre cada feriado para encontrar possíveis pontes.
  allHolidays.forEach(holiday => {
    const holidayDate = holiday.date;
    
    // Verifica se o feriado é uma terça-feira para identificar uma ponte na segunda-feira.
    if (holidayDate.isoWeekday() === 2) { // 2 = Terça-feira
      const previousDay = holidayDate.clone().subtract(1, 'days');
      if (previousDay.isoWeekday() === 1) { // 1 = Segunda-feira
        facultativeDays.push({
          name: `Ponte ${holiday.name}`,
          month: previousDay.month() + 1,
          day: previousDay.date(),
          holidayRelated: holiday.name,
          weekDayName: holidayDate.format("DDDD".toLowerCase())
        });
      }
    }
    
    // Verifica se o feriado é uma quinta-feira para identificar uma ponte na sexta-feira.
    if (holidayDate.isoWeekday() === 4) { // 4 = Quinta-feira
      const nextDay = holidayDate.clone().add(1, 'days');
      if (nextDay.isoWeekday() === 5) { // 5 = Sexta-feira
        facultativeDays.push({
          name: `Ponte ${holiday.name}`,
          month: nextDay.month() + 1,
          day: nextDay.date(),
          holidayRelated: holiday.name,
          weekDayName: holidayDate.format("DDDD".toLowerCase())
        });
      }
    }
  });
  
  return facultativeDays;
}

export {getFacultativeOperationDays};

console.log(getFacultativeOperationDays(2026))
