import Moment from 'moment'

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
    return new Moment(time).format(format)
  }

  static resumeInfoLine({modal, departure_location, destination_location, operation_days, time_first_start}) {
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

    return `Linha de ${modal} de ${departure_location} para ${destination_location}. Partidas ${qualifiedStarts || 'durante a semana (verifique o quadro de horários)'} a partir das ${Util.formatTime(time_first_start, 'HH:mm') || '00:00'}.`;
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

  static convertToSafeText(title) {
    let sanitize = title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\u0100-\u1EFF]/g, "")
    sanitize = sanitize.toLowerCase().replace(/\s/g, "-")
    sanitize = sanitize.toLowerCase().replace(/^\w]/g, "");
    return sanitize.replace(/-{2,}/g, '-');
  }
}
