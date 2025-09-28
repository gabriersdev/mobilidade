import {translateWeather} from './WeatherUtils.jsx';
import PropTypes from "prop-types";

const CityInfo = ({weatherData}) => {
  const current = weatherData.current;
  
  if (!current) {
    return null;
  }
  
  const translatedCondition = translateWeather(current.condition?.text);
  
  return (
    <p className={"mb-0"}>
      Agora em Sabará fazem {current?.["temp_c"] ?? "0"}º graus.
      A umidade relativa do ar é de {current?.["humidity"] ?? "0"}%.
      O tempo é {translatedCondition ?? "bom"}
      <img
        style={{width: "2rem", height: "2rem"}}
        className={"object-fit-cover d-inline"}
        src={current.condition?.icon}
        alt={`Imagem ilustrativa do tempo ${translatedCondition ?? "bom"}`}
      />
    </p>
  );
};

CityInfo.propTypes = {
  weatherData: PropTypes.object.isRequired
}

export default CityInfo;
