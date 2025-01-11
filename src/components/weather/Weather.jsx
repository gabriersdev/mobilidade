import React, {useEffect, useState} from 'react';
import axios from "axios";
import config from "../../config.js";

const Weather = () => {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [text, setText] = useState('')

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await axios.post(`${config.host}/api/weather/`, {
          // TODO - Implementar: pode haver mais de uma cidade, dependendo do local de partida e destino da linha. Neste caso, é necessário receber o nome da cidade
          city_name: 'sabara-minas-gerais-brazil',
        })
        setResponse(response.data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    getWeather()
  }, []);

  if (loading) {
    return <></>
  } else if (error) {
    console.log('Erro ao buscar a previsão do tempo: %s', error)
    return <></>
  } else if (response) {
    // Existe previsão de precipitação
    if (response.current.precip_mm > 0) {
      // Ranges de precipitação
      if (response.current.precip_mm <= 2) {
        setText('Previsão de chuva leve. Normalmente não causa transtornos ao trânsito ou atraso nos horários de partida.')
        return
      } else if (response.current.precip_mm <= 10) {
        setText('Previsão de chuva moderada. Pode causar atrasos nos horários de partida.')
        return
      } else if (response.current.precip_mm <= 30) {
        setText('Fique ligado! Previsão de chuva forte. Pode causar atrasos nos horários de partida e transtornos ao trânsito.')
        return
      } else {
        setText('Atenção! Previsão de chuva muito forte/torrencial. O que deve causar atrasos nos horários de partida e transtornos ao trânsito. Se possível, evite sair de casa e fique em um local fechado e seguro.')
        return
      }
    }

    // TODO - Tratativa para outros tipos de condição climática e tradução para português
    switch (response.current.condition.text.toLowerCase()) {
      case 'partly cloudy':
        setText('Tempo parcialmente nublado na região. Aproveite o dia!')
        return
      case 'cloudy':
        setText('Tempo nublado na região. Leve um guarda-chuva e aproveite o dia!')
        return
      case 'sunny':
        setText('Tempo ensolarado na região. Aproveite o dia e use protetor solar!')
        return
    }

    setText(response.current.condition.text)
  }

  return (
    <>
      {JSON.stringify(text || 'Texto vazio, nulo ou indefinido')}
    </>
  )
}

export default Weather;
