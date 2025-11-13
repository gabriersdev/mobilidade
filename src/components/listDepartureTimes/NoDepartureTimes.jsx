import {useContext} from "react";
import {TimeContext} from "./DepartureTimeContext.jsx";
import Alert from "../alert/Alert.jsx";
import Util from "../../assets/Util.jsx"

import moment from "moment";
import PropTypes from "prop-types";

moment.locale("pt-br");
const getCurrentDayGroupName = () => Util.getCurrentDayGroupName();

/**
 * Componente isolado para exibir o alerta de "nenhum horário de partida".
 * Ele lê defaultEventKey diretamente do TimeContext para garantir que
 * reaja às alterações de estado (evita que a string fique memorizada e
 * não atualize quando o contexto mudar).
 *
 * Props:
 * - isFirst: boolean (exibe o alerta apenas para o primeiro item)
 */
const NoDepartureTimes = ({isFirst}) => {
  const {defaultEventKey} = useContext(TimeContext);
  
  // Só renderiza para o primeiro item (mesma lógica anterior)
  if (!isFirst) return null;
  
  const currentDayName = getCurrentDayGroupName();
  
  const show = Array.isArray(defaultEventKey) && defaultEventKey.length === 0;
  
  if (!show) return null;
  
  return (
    <Alert variant={"warning"}>
      <p className={"m-0 p-0"}>
        Essa linha <b>não possui horários de partida {['sábado', 'domingo'].includes(currentDayName) ? "aos" : "em"} {currentDayName}{['dia útil'].includes(currentDayName) ? "dias úteis" : "s"}.</b>
      </p>
    </Alert>
  );
};

NoDepartureTimes.propTypes = {
  isFirst: PropTypes.object
}

export default NoDepartureTimes;
