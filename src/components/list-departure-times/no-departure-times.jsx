import {useContext} from "react";
import {TimeContext} from "./departure-time-context.jsx";
import {ThemeContext} from "../ui/theme-context/theme-context-obj.js";
import Alert from "../ui/alert/alert.jsx";
import Util from "../../lib/Util.jsx";

import moment from "moment";
import PropTypes from "prop-types";
import {dateConfigs} from "@/assets/resources.js";

moment.locale(dateConfigs.lang);

/**
 * Componente isolado para exibir o alerta de "nenhum horário de partida".
 * Lê o defaultEventKey específico do sentido atual para evitar conflito entre
 * sentidos com quadros de dias diferentes.
 *
 * Props:
 * - isFirst: boolean (exibe o alerta apenas para o primeiro item)
 */
function NoDepartureTimes({isFirst}) {
  const {defaultEventKey, defaultEventKeys} = useContext(TimeContext);
  const {direction, scope} = useContext(ThemeContext) || {};

  if (!isFirst) return null;

  const currentDayName = Util.getCurrentDayGroupName(scope)[0];
  const directionDefaultEventKey = defaultEventKeys?.[direction] ?? defaultEventKey;

  const show = Array.isArray(directionDefaultEventKey) && directionDefaultEventKey.length === 0;

  if (!show) return null;

  return (
    <Alert variant={"warning"} dismissible={true}>
      <p className={"m-0 p-0"}>
        Essa linha {" "}
        <b>
          não possui horários de partida
          {" "}
          {['sábado', 'domingo'].includes(currentDayName) ? "aos" : "em"}
          {" "}
          {
            (['dia útil'].includes(currentDayName) ? "dias úteis" : currentDayName.toString().replaceAll(",", " ")) +
            (currentDayName.toString().endsWith("s") ? "" : "s")
          }.
        </b>
      </p>
    </Alert>
  );
}

NoDepartureTimes.propTypes = {
  isFirst: PropTypes.oneOfType([PropTypes.object, PropTypes.bool, PropTypes.number])
}

export default NoDepartureTimes;
