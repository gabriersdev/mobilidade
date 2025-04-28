import {useEffect, useState} from 'react';
import axios from "axios";
import config from "../../config.js";
import Alert from "../alert/Alert.jsx";
import {AnimatePresence} from "framer-motion";
import AnimatedComponent from "../animatedComponent/AnimatedComponent.jsx";

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
  
  if (!weatherData.current) {
    console.warn("Properties \"current\" in \"weatherData\" doesn't exist");
    return null;
  }
  
  const precipMM = weatherData.current.precip_mm || 0;
  const codition = weatherData.current.condition.text || null
  const urlSabara = "https://weather.com/pt-BR/clima/hoje/l/646250a76bd16287c123337146826b2b02f52060e24a29adb2c9b6fb33965539"
  
  try {
    if (precipMM >= 1) {
      if (precipMM <= 2) alertText = 'Previsão de chuva leve para a região. Normalmente não causa transtornos ao trânsito ou atraso nos horários de partida.'
      else if (precipMM <= 10) alertText = 'Previsão de chuva moderada para a região. Pode causar atrasos nos horários de partida.'
      else if (precipMM <= 30) alertText = 'Fique ligado! Previsão de chuva forte para a região. Pode causar atrasos nos horários de partida e transtornos ao trânsito.'
      else alertText = 'Atenção! Previsão de chuva muito forte/torrencial para a região. O que deve causar atrasos nos horários de partida e transtornos ao trânsito. Se possível, evite sair de casa e fique em um local fechado e seguro.'
    } else if (codition.toLowerCase().includes('rain')) alertText = 'Chuva na região. Saia mais cedo e com guarda-chuvas. A chuva pode atrasar os horários de partida e causar transtornos no trânsito.'
  } catch (e) {
    console.error('Erro ao processar dados:', e);
  }
  
  if (!alertText) return <></>
  
  return (
    <AnimatePresence mode={"wait"}>
      <AnimatedComponent>
        <Alert variant={'weather'} margin={"mt-3"}>
          <span>
            <p className={"m-0 p-0 d-inline-block"}>{alertText}</p>{" "}
            {/*<span>Precipitação de {new Intl.NumberFormat("pt-BR").format(precipMM.toFixed(2))} milímetros.</span>{" "}*/}
            <a className={"text-info-emphasis fw-semibold d-inline-block"} href={urlSabara} rel={"noreferrer noopener"} target={"_blank"}>
              Saiba mais e veja a previsão do tempo para os próximos dias.
            </a>
          </span>
        </Alert>
      </AnimatedComponent>
    </AnimatePresence>
  );
};

export default Weather;
