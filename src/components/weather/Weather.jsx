import PropTypes from 'prop-types';
import useWeatherData from './UseWeatherData.jsx';
import WeatherAlert from './WeatherAlert.jsx';
import CityInfo from './CityInfo.jsx';

const Weather = ({variant = "default"}) => {
  // O nome da cidade agora é passado para o hook.
  const {weatherData, status} = useWeatherData('sabara-minas-gerais-brazil');
  
  // Renderiza um loader ou nada enquanto os dados estão sendo carregados.
  if (status === 'loading') return null;
  
  // Renderiza nada em caso de erro ou se não houver dados.
  if (status === 'error' || !weatherData?.current) return null;
  
  // Decide qual componente de apresentação renderizar.
  if (variant === "city-info") return <CityInfo weatherData={weatherData}/>;
  return <WeatherAlert weatherData={weatherData}/>;
};

Weather.propTypes = {
  variant: PropTypes.oneOf(["city-info", "default"])
};

export default Weather;
