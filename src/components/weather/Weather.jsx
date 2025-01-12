import React, {useEffect, useState} from 'react';
import axios from "axios";
import config from "../../config.js";
import Alert from "../alert/Alert.jsx";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await axios.post(`${config.host}/api/weather/`, {
          city_name: 'sabara-minas-gerais-brazil',
        });
        setWeatherData(response.data);
        setStatus('success');
      } catch (error) {
        console.error('Erro ao buscar a previsão do tempo:', error);
        setStatus('error');
      }
    };

    getWeather();
  }, []);

  if (status === 'loading') {
    return <></>; // Ou um componente de loading mais visual
  }

  if (status === 'error') {
    return <></>; // Ou um componente de erro
  }

  if (!weatherData) { // Segurança adicional
    return <></>;
  }

  let alertText

  try {
    if (weatherData.current.precip_mm > 0) {
      if (weatherData.current.precip_mm <= 2) {
        alertText = 'Previsão de chuva leve. Normalmente não causa transtornos ao trânsito ou atraso nos horários de partida.'
      } else if (weatherData.current.precip_mm <= 10) {
        alertText = 'Previsão de chuva moderada. Pode causar atrasos nos horários de partida.'
      } else if (weatherData.current.precip_mm <= 30) {
        alertText = 'Fique ligado! Previsão de chuva forte. Pode causar atrasos nos horários de partida e transtornos ao trânsito.'
      } else {
        alertText = 'Atenção! Previsão de chuva muito forte/torrencial. O que deve causar atrasos nos horários de partida e transtornos ao trânsito. Se possível, evite sair de casa e fique em um local fechado e seguro.'
      }
    }
  } catch (e) {
    console.error('Erro ao processar dados:', e);
    // Manter o texto padrão caso haja erro no processamento dos dados
  }

  if (!alertText) return <></>

  return (
    <Alert variant={'weather'} margin={"mt-3"}>
      <span>{alertText}</span>
    </Alert>);
};

export default Weather;
