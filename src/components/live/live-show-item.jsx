import moment from "moment";
import Util from "../../assets/Util.jsx";
import {useCallback, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";

moment.locale("pt-BR");


export default function LiveShowItem({d, configs}) {
  // TODO - implementar logica e bloqueio para evitar ocasiões em que os audios de aviso toquem juntos
  const defaultAudio = "/audio/general.mp3";
  const audioRef = useRef();
  
  const [audio, setAudio] = useState(defaultAudio);
  const [audioAditionalProps, setAudioAditionalProps] = useState({});
  
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
  
  useEffect(() => {
    // BUG - verificar
    if (audioRef.current) {
      const refId = audioRef.current?.dataset?.dataRefId;
      setTimeout(() => {
        setAudioAditionalProps({
          autoPlay: true
        });
        
        if (refId) document.querySelector(`[data-ref-id=${refId}]`).volume = configs?.["volume"] ? +configs.volume > 0 ? +configs.volume : 70 : 70;
      }, +(1000 + (10 * 1000 * (+refId))));
    }
  }, [audioRef])
  
  return (
    <div>
      {
        moment(d?.["expected_arrival_time"]).diff(moment(), "minutes") > 0 ? (
          <div>
            <span>{textOrderDeparturePoint((d?.["order_departure_point"] ?? -1))}</span>
            <span>{" "}</span>
            <span>{Util.diffToHuman(moment(d?.["expected_arrival_time"]))}</span>
          </div>
        ) : (
          <div>
            {
              configs?.["warningSound"] && (
                <audio
                  ref={audioRef}
                  data-ref-id={d?.["i"] ?? 0}
                  className={"d-none"}
                  src={[4986, 4987, 4988].map(x => x.toString()).includes(d?.["line_number"] ?? -1) ? `/audio/${d?.["line_number"]}.mp3` : audio}
                  onError={() => {
                    setAudio(defaultAudio)
                  }}
                  autoPlay
                  {...audioAditionalProps}
                >
                </audio>
              )
            }
            <span>{textOrderDeparturePointNow((d?.["order_departure_point"] ?? -1))}</span>
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
