import {translateWeather} from './WeatherUtils.jsx';
import PropTypes from "prop-types";
import AnimatedComponents from "../animatedComponent/AnimatedComponents.jsx";

const CityInfo = ({weatherData}) => {
  const current = weatherData.current;
  
  if (!current) {
    return null;
  }
  
  const translatedCondition = translateWeather(current.condition?.text);
  
  return (
    <AnimatedComponents>
      <p className={"m-0 p-0 d-flex flex-wrap align-items-center lh-base gap-1 text-balance"}>
        <span>Agora em Sabará fazem {current?.["temp_c"] ?? "0"}º graus.</span>
        <span>A umidade relativa do ar é de {current?.["humidity"] ?? "0"}%. Beba água.</span>
        <span>O tempo é {translatedCondition ?? "bom"}</span>
        <img
          style={{width: "1.5rem", height: "1.5rem"}}
          className={"object-fit-cover d-inline"}
          src={(current.condition?.icon || "").replace("//", "https://")}
          alt={`Imagem ilustrativa do tempo ${translatedCondition ?? "bom"}`}
        />
      </p>
    </AnimatedComponents>
  );
};

CityInfo.propTypes = {
  weatherData: PropTypes.object.isRequired
}

export default CityInfo;
