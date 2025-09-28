import {AnimatePresence} from 'framer-motion';
import {getWeatherAlertText} from './WeatherUtils.jsx';
import Alert from "../alert/Alert.jsx";
import AnimatedComponent from "../animatedComponent/AnimatedComponent.jsx";
import PropTypes from "prop-types";

const WeatherAlert = ({weatherData}) => {
  const alertText = getWeatherAlertText(weatherData.current);
  const urlSabara = "https://weather.com/pt-BR/clima/hoje/l/646250a76bd16287c123337146826b2b02f52060e24a29adb2c9b6fb33965539";
  
  if (!alertText) {
    return null;
  }
  
  return (
    <AnimatePresence mode={"wait"}>
      <AnimatedComponent>
        <Alert variant={'weather'} margin={"mt-3"}>
          <span>
            <p className={"m-0 p-0 d-inline-block"}>{alertText}</p>{" "}
            <a className={"text-info-emphasis fw-semibold d-inline-block"} href={urlSabara} rel={"noreferrer noopener"} target={"_blank"}>
              Saiba mais e veja a previsão do tempo para os próximos dias.
            </a>
          </span>
        </Alert>
      </AnimatedComponent>
      {/*<p>{alertText}</p>*/}
    </AnimatePresence>
  );
};

WeatherAlert.propTypes = {
  weatherData: PropTypes.object.isRequired
}

export default WeatherAlert;
