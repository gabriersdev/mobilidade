import Moment from 'moment'
import Arial from "../components/ui/arial/arial.jsx";
import axios from "axios";
import config from "./config.js";
import moment from 'moment';
import 'moment/locale/pt-br';
import {Link} from "react-router-dom";
import {getAllHolidays, getVacation} from "./holidays.js";

moment.locale('pt-br');

export default class Util {
  // Mark link as active
  static updateActiveLink() {
    const links = document.querySelectorAll(`[href]`)
    if (links) links.forEach(link => link.getAttribute('href') === window.location.pathname ? link.classList.add('active') : link.classList.remove('active'))
  }
  
  static arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }
  
  static createArray(length, add) {
    if (!add) return Array.from({length: length}, (_, i) => i)
    return Array.from({length: length}, (_, i) => i + add)
  }
  
  static formatTime(time, format) {
    const date = new Moment(time).format(format)
    if (date !== "Invalid date") return date
  }
  
  static resumeInfoLine({modal, departure_location, destination_location, operation_days}) {
    // static resumeInfoLine({modal, departure_location, destination_location, operation_days, time_first_start}) {
    // console.log(modal, departure_location, destination_location, operation_days, time_first_start)
    
    if (modal === 1) modal = 'ônibus'
    else if (modal === 2) modal = 'metrô'
    else modal = 'transporte público'
    
    let newOperationDays = Array.isArray((operation_days)) ? operation_days.sort() : [1, 2, 3, 4]
    
    // Seguindo lógica do sistema, para o caso de todos os dias da semana, não é necessário informar os dias, apenas o número conforme o banco de dados
    if (Util.arraysEqual(newOperationDays, [5, 6, 7])) {
      newOperationDays = Util.createArray(7)
    } else if (Util.arraysEqual(newOperationDays, [5, 6])) {
      newOperationDays = Util.createArray(6)
    } else if (Util.arraysEqual(newOperationDays, [5])) {
      newOperationDays = Util.createArray(5)
    }
    
    // const dayNames = ["segunda", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado", "domingo"]
    // const operationDayNames = []
    let qualifiedStarts;
    
    if (Util.arraysEqual(Util.createArray(7), newOperationDays)) {
      // operationDayNames.concat(dayNames)
      qualifiedStarts = 'todos os dias da semana'
    } else if (Util.arraysEqual(Util.createArray(5), newOperationDays)) {
      // operationDayNames.concat(dayNames.toSpliced(5))
      qualifiedStarts = 'de segunda à sexta'
    } else if (Util.arraysEqual(Util.createArray(6), newOperationDays)) {
      // operationDayNames.concat(dayNames.toSpliced(6))
      qualifiedStarts = 'de segunda à sábado'
    }
    // } else {
    // operationDayNames.concat(newOperationDays.map((dayNumber) => dayNames.at(dayNumber)))
    // qualifiedStarts = operationDayNames.join(', ')
    // }
    
    return `Linha de ${!modal || !departure_location ? "transporte público de Sabará-MG" : (modal + " de " + departure_location + " para " + destination_location)}. Partidas ${qualifiedStarts || 'durante a semana - verifique o quadro de horários'}. As informações são verificadas periodicamente. Se algo estiver errado, envie um reporte.`;
  }
  
  static isSameDomain(url) {
    if (url.startsWith('/')) return true;
    
    try {
      const currentOrigin = new URL(window.location.href).origin;
      const linkOrigin = new URL(url).origin;
      // console.log(currentOrigin, linkOrigin)
      return currentOrigin === linkOrigin;
    } catch (error) {
      console.log('Um erro ocorreu: %s', error.message)
      // URL inválida, assumimos que não é do mesmo domínio
      return false;
    }
  }
  
  // static formatString(text, format) {
  //   // Remove non-numeric characters from the text if the format only contains #, otherwise keeps the original characters
  //   const cleanText = format.includes('#') && !format.includes('?') ? text.replace(/\D/g, '') : text;
  //
  //   let result = '';
  //   let textIndex = 0;
  //
  //   for (let i = 0; i < format.length; i++) {
  //     if (format[i] === '#') {
  //       if (textIndex < cleanText.length) {
  //         result += cleanText[textIndex];
  //         textIndex++;
  //       }
  //     } else if (format[i] === '?') { // Wildcard character, inserts if there is a character in the text
  //       if (textIndex < cleanText.length) {
  //         result += cleanText[textIndex];
  //         textIndex++;
  //       }
  //     } else {
  //       result += format[i];
  //     }
  //   }
  //
  //   return result;
  // }
  
  static convertToSafeText(text) {
    if (!text) return '';
    
    let sanitize = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\u0100-\u1EFF]/g, "");
    sanitize = sanitize.replace(/\s/g, "-");
    sanitize = sanitize.replace(/[,.]/g, '');
    sanitize = sanitize.replace(/^\w]/g, "");
    return sanitize.replace(/-{2,}/g, '-');
  }
  
  static normalize(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\u0100-\u1EFF]/g, "");
  }
  
  static convertNumberToDay = async (day) => {
    const transformDayTypeName = (t) => {
      let newT = t.replaceAll("/", " e ")
      newT = newT.replace(/PC(?<num>\d+)/gi, "- PC $1");
      return newT.substring(0, 1).toUpperCase() + newT.substring(1);
    }
    
    const table = []
    
    await axios.get(`${config.host}/api/day-tipes/`).then((response) => {
      response.data.forEach((row) => {
        table.push([row["day_type_id"], transformDayTypeName(row["day_type_name"]?.toLowerCase())]);
      })
      
      return response.data;
    }).then(() => {
      // console.log(response, new Date().getTime());
    }).catch(error => {
      console.log(error);
    })
    
    const find = table.find((item) => item[0] === parseInt(day, 10))
    
    if (!find) {
      console.error(`Dia ${day} não categorizado. Retornado: "Horário não mapeado".`);
      return 'Horário não mapeado'
    }
    
    // console.log(new Date().getTime());
    return find[1]
  }
  
  static directionToText(number) {
    switch (number) {
      case 0:
        return "Único";
      case 1:
        return "Ida";
      case 2:
        return "Volta";
      default:
        return " - ";
    }
  }
  
  static formatMoney(value) {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value)
  }
  
  // static newRenderText = (text) => {
  //   return text;
  // };
  
  static renderText = (text) => {
    // Usa regex para encontrar todas as barras e as envolve em spans
    
    try {
      if (!text.split) return text;
      
      return text.split(/(\/)/).map((part, index) => {
        if (part === "/") {
          // Adiciona uma key para o React
          return (<span key={index} style={{fontSize: 'inherit', fontFamily: "'Arial', sans-serif"}}>/</span>);
        }
        return part;
      });
    } catch {
      return text;
    }
  };
  
  static processContents = (text) => {
    const regex = /<Link\s+to={["']([^"']+)["']}>(.*?)<\/Link>/g;
    const elements = [];
    let lastIndex = 0;
    let match;
    let key = 0;
    
    while ((match = regex.exec(text)) !== null) {
      const [fullMatch, to, content] = match;
      const index = match.index;
      
      // Texto anterior ao Link
      const beforeText = text.slice(lastIndex, index);
      if (beforeText) {
        elements.push(...Util.wrapTextInArialIfNeeded(beforeText, key));
        key++;
      }
      
      const linkContent =
        content.includes("/") ? <Arial>{content}</Arial> : content;
      
      elements.push(
        <Link key={`link-${key++}`} to={to}>
          {linkContent}
        </Link>
      );
      
      lastIndex = index + fullMatch.length;
    }
    
    // Texto depois do último Link
    const afterText = text.slice(lastIndex);
    if (afterText) {
      elements.push(...Util.wrapTextInArialIfNeeded(afterText, key));
    }
    
    return elements;
  };
  
  // Função auxiliar: envolve com Arial se tiver "/"
  static wrapTextInArialIfNeeded = (text, keyPrefix) => {
    const parts = [];
    if (!text.split) return text;
    const split = text.split(/(\s+)/); // preserva espaços
    let key = 0;
    
    split.forEach((part) => {
      if (part.includes("/")) {
        const [before, after] = part.split("/")
        
        parts.push(<span key={`${keyPrefix}-a-${key++}`}><i className={"fst-normal"}>{before}</i><Arial>/</Arial><i className={"fst-normal"}>{after}</i></span>);
      } else {
        parts.push(<span key={`${keyPrefix}-s-${key++}`}>{part}</span>);
      }
    });
    
    return parts;
  };
  
  // Procura algum dia correspondente para usar no defaultEventKey
  // static getDefaultEventKey = (daysConv) => {
  //   const days = {
  //     "sabado": [6],
  //     "domingo": [0],
  //     "segunda": [1],
  //     "terca": [2],
  //     "quarta": [3],
  //     "quinta": [4],
  //     "sexta": [5],
  //     "dias uteis": [1, 2, 3, 4, 5],
  //     "dia util": [1, 2, 3, 4, 5],
  //   }
  //
  //   const now = moment();
  //   const daysConvNormalized = daysConv.map((d) => Util.normalize(d).toLowerCase().replace(/-\s*PC\s*\d*/gi, "").trimEnd());
  //   const dayMatched = days.map((d) => Util.normalize(d).toLowerCase().replace(/-\s*PC\s*\d*/gi, "").trimEnd());
  //
  //   console.log(now.weekday(), daysConvNormalized, dayMatched);
  // }
  //
  
  static translateMonth = (month) => {
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
  
  static clearServiceWorker() {
    if ('serviceWorker' in navigator) {
      caches.keys().then(function (names) {
        for (let name of names) caches.delete(name).then();
      });
    }
  }
  
  static diffToHuman(date) {
    const now = moment();
    const target = moment(date);
    
    // Se for inválido, evita erro
    if (!target.isValid()) return 'Data inválida';
    
    const diffSeconds = target.diff(now, 'seconds');
    const absDiff = Math.abs(diffSeconds);
    
    // Futuro
    if (diffSeconds > 0) {
      if (absDiff < 60) return 'em alguns segundos';
      if (absDiff < 3600) return `em ${target.diff(now, 'minutes')} minuto${target.diff(now, 'minutes') > 1 ? "s" : ""}`;
      if (absDiff < 86400) return `em ${target.diff(now, 'hours')} hora${target.diff(now, 'hours') > 1 ? "s" : ""}`;
      if (absDiff < (86400 * 30)) return `em ${target.diff(now, 'days')} dia${target.diff(now, 'days') > 1 ? "s" : ""}`;
      return `${target.format('DD/MM/YYYY')}`;
    }
    
    // Passado
    if (absDiff < 60) return 'há alguns segundos';
    if (absDiff < 3600) return `há ${now.diff(target, 'minutes')} minuto${now.diff(target, 'minutes') > 1 ? "s" : ""}`;
    if (absDiff < 86400) return `há ${now.diff(target, 'hours')} hora${now.diff(target, 'hours') > 1 ? "s" : ""}`;
    if (absDiff < (86400 * 30)) return `há ${now.diff(target, 'days')} dia${now.diff(target, 'days') > 1 ? "s" : ""}`;
    return `${target.format('DD/MM/YYYY')}`;
  }
  
  static getTodayHolidayData(scope) {
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
    
    // Para funcionar corretamente SEMPRE precisa que o horário da data seja 00:00
    const m = moment();
    const now = moment(`${m.get("year")}-${('0' + (m.get("month") + 1)).slice(-2)}-${('0' + m.get("date")).slice(-2)}T00:00:00-03:00`);
    
    let holidaysScope = getAllHolidays(now.year(), {includeRegion: `SC${('0' + codeScope).slice(-2)}`});
    return holidaysScope.find((h) => now.diff(h.date, "days") === 0);
  }

  static getTodayVacationData() {
    const m = moment();
    const now = moment(`${m.get("year")}-${('0' + (m.get("month") + 1)).slice(-2)}-${('0' + m.get("date")).slice(-2)}T00:00:00-03:00`);
    
    return getVacation(now);
  }
  
  static getCurrentDayGroupName(scope, consideringVacations) {
    if (Util.getTodayHolidayData(scope)) return 'domingo';

    if ([null, undefined, true].includes(consideringVacations)) {
      const vacation = Util.getTodayVacationData();
      if (vacation) return 'ferias';
    }
    
    switch (moment().get("day")) {
      case 0:
        return 'domingo';
      case 6:
        return 'sábado';
      default:
        return 'dia útil';
    }
  };
  
  static greaterThan(value, compare, replaced) {
    // Se o segundo argumento for uma função, ela será usada como condição
    if (typeof compare === 'function') {
      return compare(value) ? value : replaced;
    }
    
    // Se o segundo argumento for um número, compara se é maior
    if (typeof compare === 'number') {
      return value > compare ? value : replaced;
    }
    
    // Se o segundo argumento for uma string com operador
    if (typeof compare === 'string') {
      try {
        // Exemplo: ">= 10" ou "< 5"
        const condition = new Function('value', `return value ${compare}`);
        return condition(value) ? value : replaced;
      } catch {
        console.warn('Invalid comparison string.');
        return replaced;
      }
    }
    
    // Fallback: se for do tipo boolean, comportamento igual ao ternário
    return compare ? value : replaced;
  }
  
  static translateWeekDay(weekDay, props) {
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

  static parseDatetimeTimezone(d) {
    return {
      ...d,
      "departure_time_trip": parseInt(import.meta.env?.["VITE_MODE"], 10) === 0 ? d?.["departure_time_trip"].replace("Z", "-03:00") : d?.["departure_time_trip"],
      "expected_arrival_time": parseInt(import.meta.env?.["VITE_MODE"], 10) === 0 ? d?.["expected_arrival_time"].replace("Z", "-03:00") : d?.["expected_arrival_time"],
    }
  }

  static getSearchParamId(location) {
    if (!location || !location.search) return null;
    const searchParams = new URLSearchParams(location.search);

    const ei = searchParams.get("ei");
    if (ei) {
      const match = ei.match(/\d+/g);
      if (match) return +match.join("");
    }

    const sei = searchParams.get("sei");
    if (sei) {
      const match = sei.match(/\d+/g);
      if (match) return `${match.join("")}S`;
    }

    return null;
  }
}
