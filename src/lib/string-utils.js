import {numberConfigs} from "@/assets/resources.js";

export function resumeInfoLine({modal, departure_location, destination_location}) {
  if (modal === 1) modal = 'ônibus'
  else if (modal === 2) modal = 'metrô'
  else modal = 'transporte público'
  
  return `Linha de ${!modal || !departure_location ? "transporte público de Sabará-MG" : (modal + " de " + departure_location + " para " + destination_location)}. As informações são verificadas periodicamente. Se algo estiver errado, envie um reporte.`;
}

export function convertToSafeText(text) {
  if (!text) return '';
  
  let sanitize = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\u0100-\u1EFF]/g, "");
  sanitize = sanitize.replace(/\s/g, "-");
  sanitize = sanitize.replace(/[,.]/g, '');
  sanitize = sanitize.replace(/^\w]/g, "");
  return sanitize.replace(/-{2,}/g, '-');
}

export function normalize(text) {
  if (text.normalize) return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\u0100-\u1EFF]/g, "");
  return text;
}

export function directionToText(number) {
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

export function formatMoney(value) {
  return Intl.NumberFormat(numberConfigs.lang, {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value)
}

export function checkIsValid(id) {
  if (!id) return false
  if (!id.length) return false
  return id.match(/\d/g)
}
