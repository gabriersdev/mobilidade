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
    if (!add) return Array.from({ length: length }, (_, i) => i)
    return Array.from({ length: length }, (_, i) => i + add)
  }

  static formatTime(time, format) {
    // TODO install moment.js
    return new Moment(time).format(format)
  }

  static resumeInfoLine({ modal, localStart, localDestination, operationDays, timeFirstStart }) {
    const newOperationDays = operationDays.sort()
    const dayNames = ["segunda", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado", "domingo"]
    let operationDayNames = []
    let qualifiedStarts;

    if (Util.arraysEqual(Util.createArray(7), newOperationDays)) {
      operationDayNames.concat(dayNames)
      qualifiedStarts = 'todos os dias da semana'
    } else if (Util.arraysEqual(Util.createArray(5), newOperationDays)) {
      operationDayNames.concat(dayNames.toSpliced(5))
      qualifiedStarts = 'de segunda à sexta'
    } else if (Util.arraysEqual(Util.createArray(6), newOperationDays)) {
      operationDayNames.concat(dayNames.toSpliced(6))
      qualifiedStarts = 'de segunda à sábado'
    } else {
      operationDayNames.concat(newOperationDays.map((dayNumber) => dayNames.at(dayNumber)))
      qualifiedStarts = operationDayNames.join(', ')
    }

    return `Linha de ${modal} de ${localStart} para ${localDestination}. Partidas ${qualifiedStarts || 'durante a semana (verifique o quadro de horários)'} a partir das ${Util.formatTime(timeFirstStart, 'HH:mm') || '00:00'}.`
  }
}
