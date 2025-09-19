import Moment from 'moment'
import Arial from "../components/arial/Arial.jsx";
import axios from "axios";
import config from "../config.js";
import moment from "moment";

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
  
  static resumeInfoLine({modal, departure_location, destination_location, operation_days, time_first_start}) {
    // console.log(modal, departure_location, destination_location, operation_days, time_first_start)
    
    if (modal === 1) modal = 'ônibus'
    else if (modal === 2) modal = 'metrô'
    else modal = 'transporte público'
    
    let newoperation_days = Array.isArray((operation_days)) ? operation_days.sort() : [1, 2, 3, 4]
    
    // Seguindo lógica do sistema, para o caso de todos os dias da semana, não é necessário informar os dias, apenas o número conforme o banco de dados
    if (Util.arraysEqual(newoperation_days, [5, 6, 7])) {
      newoperation_days = Util.createArray(7)
    } else if (Util.arraysEqual(newoperation_days, [5, 6])) {
      newoperation_days = Util.createArray(6)
    } else if (Util.arraysEqual(newoperation_days, [5])) {
      newoperation_days = Util.createArray(5)
    }
    
    const dayNames = ["segunda", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado", "domingo"]
    let operationDayNames = []
    let qualifiedStarts;
    
    time_first_start = [...["2020-01-01"], time_first_start || "00:00:00"].join(" ")
    
    if (Util.arraysEqual(Util.createArray(7), newoperation_days)) {
      operationDayNames.concat(dayNames)
      qualifiedStarts = 'todos os dias da semana'
    } else if (Util.arraysEqual(Util.createArray(5), newoperation_days)) {
      operationDayNames.concat(dayNames.toSpliced(5))
      qualifiedStarts = 'de segunda à sexta'
    } else if (Util.arraysEqual(Util.createArray(6), newoperation_days)) {
      operationDayNames.concat(dayNames.toSpliced(6))
      qualifiedStarts = 'de segunda à sábado'
    } else {
      operationDayNames.concat(newoperation_days.map((dayNumber) => dayNames.at(dayNumber)))
      qualifiedStarts = operationDayNames.join(', ')
    }
    
    // return `Linha de ${!modal || !departure_location ? "transporte público de Sabará-MG" : (modal + " de " + departure_location + " para " + destination_location)}. Partidas ${qualifiedStarts || 'durante a semana (verifique o quadro de horários)'} a partir das ${Util.formatTime(time_first_start, 'HH:mm') || '00:00'}.a partir das ${Util.formatTime(time_first_start, 'HH:mm') || '00:00'}.` + ` As informações da linha são verificadas periodicamente. Verifique as informações na página, se algo estiver errado envie um reporte.`;
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
  
  static formatString(text, format) {
    // Remove non-numeric characters from the text if the format only contains #, otherwise keeps the original characters
    const cleanText = format.includes('#') && !format.includes('?') ? text.replace(/\D/g, '') : text;
    
    let result = '';
    let textIndex = 0;
    
    for (let i = 0; i < format.length; i++) {
      if (format[i] === '#') {
        if (textIndex < cleanText.length) {
          result += cleanText[textIndex];
          textIndex++;
        }
      } else if (format[i] === '?') { // Wildcard character, inserts if there is a character in the text
        if (textIndex < cleanText.length) {
          result += cleanText[textIndex];
          textIndex++;
        }
      } else {
        result += format[i];
      }
    }
    
    return result;
  }
  
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
      // TODO - Buscar no banco de dados especialmente no caso de não ter horário mapeado no array
      console.error(`Dia ${day} não categorizado. Retornado: "Horário não mapeado".`);
      return 'Horário não mapeado'
    }
    
    // console.log(new Date().getTime());
    return find[1]
  }
  
  static formatMoney(value) {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value)
  }
  
  static newRenderText = (text) => {
    return text;
  };
  
  static renderText = (text) => {
    // Usa regex para encontrar todas as barras e as envolve em spans
    
    if (!text.split) return text;
    
    return text.split(/(\/)/).map((part, index) => {
      if (part === "/") {
        // Adiciona uma key para o React
        return (<span key={index} style={{fontSize: 'inherit', fontFamily: "'Arial', sans-serif"}}>/</span>);
      }
      return part;
    });
  };
  
  static processContents = (text) => {
    const regex = /<Link\s+to={(?:"|')([^"']+)(?:"|')}>(.*?)<\/Link>/g;
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
      
      // TODO - usar o componente Link ao invés do link puro
      elements.push(
        <a key={`link-${key++}`} href={to} target={"_blank"}>
          {linkContent}
        </a>
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
        
        parts.push(<span key={`${keyPrefix}-a-${key++}`}><i className={"fst-normal fw-normal"}>{before}</i><Arial>/</Arial><i className={"fst-normal fw-normal"}>{after}</i></span>);
      } else {
        parts.push(<span key={`${keyPrefix}-s-${key++}`}>{part}</span>);
      }
    });
    
    return parts;
  };
  
  // Procura algum dia correspondente para usar no defaultEventKey
  static getDefaultEventKey = (daysConv) => {
    const days = {
      "sabado": [6],
      "domingo": [0],
      "segunda": [1],
      "terca": [2],
      "quarta": [3],
      "quinta": [4],
      "sexta": [5],
      "dias uteis": [1, 2, 3, 4, 5],
      "dia util": [1, 2, 3, 4, 5],
    }
    
    const now = moment();
    const daysConvNormalized= daysConv.map((d) => Util.normalize(d).toLowerCase().replace(/-\s*PC\s*\d*/gi, "").trimEnd());
    const dayMatched = days.map((d) => Util.normalize(d).toLowerCase().replace(/-\s*PC\s*\d*/gi, "").trimEnd());
    
    console.log(now.weekday(), daysConvNormalized, dayMatched);
  }
  
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
        // console.log("SW Key: ", names);
        for (let name of names) {
          // console.log("SW Key Item: ", name);
          caches.delete(name);
        }
      });
    }
  }
}
