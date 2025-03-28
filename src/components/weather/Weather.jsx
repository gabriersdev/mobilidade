import {useEffect, useState} from 'react';
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

    getWeather().then();
  }, []);

  if (status === 'loading' || status === 'error' || !weatherData) return <></>;
  let alertText;

  try {
    if (weatherData.current.precip_mm > 1) {
      if (weatherData.current.precip_mm <= 2) alertText = 'Previsão de chuva leve para a região. Normalmente não causa transtornos ao trânsito ou atraso nos horários de partida.'
      else if (weatherData.current.precip_mm <= 10) alertText = 'Previsão de chuva moderada para a região.. Pode causar atrasos nos horários de partida.'
      else if (weatherData.current.precip_mm <= 30) alertText = 'Fique ligado! Previsão de chuva forte para a região. Pode causar atrasos nos horários de partida e transtornos ao trânsito.'
      else alertText = 'Atenção! Previsão de chuva muito forte/torrencial para a região. O que deve causar atrasos nos horários de partida e transtornos ao trânsito. Se possível, evite sair de casa e fique em um local fechado e seguro.'
    }
  } catch (e) {
    console.error('Erro ao processar dados:', e);
  }

  if (!alertText) return <></>

  return (
    <Alert variant={'weather'} margin={"mt-3"}>
      <span>{alertText}</span>
    </Alert>);
};

export default Weather;
