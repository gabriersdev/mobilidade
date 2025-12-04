// Constantes para os limites de precipitação
import PropTypes from "prop-types";

const PRECIPITATION_LEVEL = {
  // TODO - analisar estabelecer um nível para chuva mais fina que "LIGHT"
  LIGHT: 2,
  MODERATE: 10,
  HEAVY: 30,
};

export const getWeatherAlertText = (currentWeather) => {
  if (!currentWeather) {
    return null;
  }
  
  const precipt = currentWeather?.["precip_mm"] || 0;
  const conditionText = currentWeather.condition?.text || '';
  
  if (precipt >= 0.15) {
    if (precipt <= PRECIPITATION_LEVEL.LIGHT) return 'Previsão de chuva leve para a região. Normalmente não causa transtornos ao trânsito ou atraso nos horários de partida.';
    if (precipt <= PRECIPITATION_LEVEL.MODERATE) return 'Previsão de chuva moderada para a região. Pode causar atrasos nos horários de partida.';
    if (precipt <= PRECIPITATION_LEVEL.HEAVY) return 'Fique ligado! Previsão de chuva forte para a região. Pode causar atrasos nos horários de partida e transtornos ao trânsito.';
    return 'Atenção! Previsão de chuva muito forte/torrencial para a região. O que deve causar atrasos nos horários de partida e transtornos ao trânsito. Se possível, evite sair de casa e fique em um local fechado e seguro.';
  }
  
  if (conditionText === "Patchy rain nearby") {
    return 'Chuva nas proximidades.';
  }
  
  if (conditionText.toLowerCase().includes('rain')) {
    return 'Chuva na região. Saia mais cedo e com guarda-chuvas. A chuva pode atrasar os horários de partida e causar transtornos no trânsito.';
  }
  
  return null;
};

getWeatherAlertText.propTypes = {
  currentWeather: PropTypes.object.isRequired
}

export const translateWeather = (conditionText) => {
  const weather = {
    "clear": "céu limpo",
    "sunny": "ensolarado",
    "mostly clear": "principalmente limpo",
    "partly cloudy": "parcialmente nublado",
    "mostly cloudy": "principalmente nublado",
    "clouds": "nublado",
    "few clouds": "poucas nuvens",
    "scattered clouds": "nuvens dispersas",
    "broken clouds": "nuvens quebradas",
    "overcast": "nublado (encoberto)",
    "rain": "chuva",
    "light rain": "chuva leve",
    "heavy rain": "chuva forte",
    "drizzle": "garoa",
    "thunderstorm": "trovoada",
    "snow": "neve",
    "light snow": "neve leve",
    "heavy snow": "neve forte",
    "flurries": "flocos de neve",
    "mist": "névoa",
    "fog": "neblina",
    "smoke": "fumaça",
    "haze": "névoa seca",
    "dust": "poeira",
    "sand": "areia",
    "ash": "cinzas",
    "squall": "rajada",
    "tornado": "tornado",
    "ice pellets": "granizo",
    "freezing rain": "chuva congelante",
    "freezing drizzle": "garoa congelante"
  };
  
  // normaliza: tudo em minúsculo e remove acentuação (opcional)
  const key = conditionText.toLowerCase().trim();
  if (weather[key]) {
    return weather[key];
  }
  
  // Tentar correspondência parcial (ex: “light rain and snow”, “rain with thunderstorm”)
  for (let k in weather) {
    if (key.includes(k)) {
      return weather[k];
    }
  }
  
  return conditionText;  // se não encontrar, retorna original
}

translateWeather.propTypes = {
  conditionText: PropTypes.string
}
