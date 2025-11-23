import moment from "moment";
import Util from "../../assets/Util.jsx";
import {useCallback, useState} from "react";
import PropTypes from "prop-types";

moment.locale("pt-BR");

// TODO - corrigir o retorno dos textos de pontos
export default function LiveShowItem({d, configs}) {
  const defaultAudio = "/audio/general.mp3";
  const [audio, setAudio] = useState(defaultAudio);
  
  const textOrderDeparturePoint = useCallback((number) => {
    if (number === 1) return "Saindo";
    else if (parseInt(number ?? "-1", 10) === parseInt(d?.["total_departure_points"] ?? "-2", 10)) return "Somente desembarque - Chegará";
    else return "Chegará";
  }, [d]);
  
  const textOrderDeparturePointNow = useCallback((number) => {
    if (number === 1) return "Saindo agora!";
    else if (parseInt(number ?? "-1", 10) === parseInt(d?.["total_departure_points"] ?? "-2", 10)) return "Somente desembarque - Aproximando...";
    else return "Aproximando...";
  }, [d]);
  
  return (
    <div>
      {
        moment(d?.["expected_arrival_time"]).diff(moment(), "minutes") > 0 ? (
          <div>
            <span>{textOrderDeparturePointNow((d?.["order_departure_point"] ?? -1))}</span>
            <span>{" "}</span>
            <span>{Util.diffToHuman(moment(d?.["expected_arrival_time"]))}</span>
          </div>
        ) : (
          <div>
            {
              configs?.["warningSound"] && (
                <audio
                  src={[4986, 4987, 4988].map(x => x.toString()).includes(d?.["line_number"] ?? -1) ? `/audio/${d?.["line_number"]}.mp3` : audio}
                  onError={() => {
                    setAudio(defaultAudio)
                  }} className={"d-none"} autoPlay>
                </audio>
              )
            }
            <span>{textOrderDeparturePoint((d?.["order_departure_point"] ?? -1))}</span>
          </div>
        )
      }
    </div>
  )
}

LiveShowItem.propTypes = {
  d: PropTypes.object.isRequired,
  configs: PropTypes.object.isRequired
}
