import Moment from 'moment'
import Arial from "../components/arial/Arial.jsx";

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
  
  // TODO - transformar em um componente
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
    
    return `Linha de ${!modal || !departure_location ? "transporte público de Sabará-MG" : (modal + " de " + departure_location + " para " + destination_location)}. Partidas ${qualifiedStarts || 'durante a semana (verifique o quadro de horários)'} a partir das ${Util.formatTime(time_first_start, 'HH:mm') || '00:00'}.` + ` As informações da linha são verificadas periodicamente. Verifique as informações na página, se algo estiver errado envie um reporte.`;
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
    
    let sanitize = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\u0100-\u1EFF]/g, "")
    sanitize = sanitize.replace(/\s/g, "-")
    sanitize = sanitize.replace(/[,.]/g, '')
    sanitize = sanitize.replace(/^\w]/g, "");
    return sanitize.replace(/-{2,}/g, '-');
  }
  
  static convertNumberToDay = (day) => {
    // TODO - buscar no banco de dados as keys
    const table = [
      [1, 'Dias úteis'],
      [2, 'Sábado'],
      [3, 'Domingos e feriados'],
      [4, 'Domingos e feriados'],
      [5, 'Dias úteis - atípico'],
      [6, 'Sábados - atípico'],
      [7, 'Domingos e feriados - atípico'],
      [8, 'Dias úteis - férias'],
      [9, 'Sábados - férias'],
      [10, 'Domingos - férias'],
      [11, 'Dias úteis - PC1'],
      [12, 'Sábados - PC2'],
      [13, 'Domingos e feriados - PC2'],
      [14, 'Quartas-feiras - PC1'],
      [15, 'Quartas-feiras - PC2'],
      [16, 'Quintas-feiras - PC1'],
      [17, 'Quintas-feiras - PC2'],
      [18, 'Sexta-feiras - PC1'],
      [19, 'Sexta-feiras - PC2'],
      [20, 'Segundas-feiras - PC1'],
      [21, 'Segundas-feiras - PC2'],
      [22, 'Terças-feiras - PC1'],
      [23, 'Terças-feiras - PC2'],
    ]
    
    const find = table.find((item) => item[0] === parseInt(day, 10))
    
    if (!find) {
      // TODO - Buscar no banco de dados especialmente no caso de não ter horário mapeado no array
      console.error(`Dia ${day} não categorizado. Retornado: "Horário não mapeado".`);
      return 'Horário não mapeado'
    }
    
    return find[1]
  }
  
  static formatMoney(value) {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value)
  }
  
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
        <a key={`link-${key++}`} href={to}>
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
}
