import moment from "moment";
import Util from "../../lib/Util.jsx";
import {useCallback, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {dateConfigs} from "@/assets/resources.js";

moment.locale(dateConfigs.lang);

export default function LiveShowItem({d, configs}) {
  const defaultAudio = "/audio/general.mp3";
  const audioRef = useRef();
  
  const [audio, setAudio] = useState(defaultAudio);
  // const [audioAditionalProps, setAudioAditionalProps] = useState({});
  const hasPlayedRef = useRef(false);
  
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

  const isApproaching = moment(d?.["expected_arrival_time"]).diff(moment(), "minutes") <= 0;

  useEffect(() => {
    if (!isApproaching) {
      hasPlayedRef.current = false;
    }
  }, [isApproaching]);
  
  useEffect(() => {
    if (isApproaching && audioRef.current && configs?.["warningSound"] && !hasPlayedRef.current) {
      hasPlayedRef.current = true;
      const tryPlay = () => {
        // Check if any audio is currently playing
        const isPlaying = Array.from(document.querySelectorAll('audio')).some(a => !a.paused && !a.muted);
        if (isPlaying) {
          setTimeout(tryPlay, 2000);
          return;
        }
        audioRef.current.volume = configs?.["volume"] > 0 ? configs.volume / 100 : 0.7;
        audioRef.current.play().catch(console.warn);
      };
      
      const timeoutId = setTimeout(tryPlay, 500 + Math.random() * 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [isApproaching, configs?.["warningSound"], configs?.["volume"]]);
  
  return (
    <div className={"fs-inherit"}>
      {configs?.["warningSound"] && (
        <audio
          ref={audioRef}
          data-ref-id={d?.["i"] ?? 0}
          className={"d-none"}
          preload="auto"
          src={d?.["srcAudio"] || ([4986, 4987, 4988].includes(parseInt(d?.["line_number"])) ? `/audio/${d?.["line_number"]}.mp3` : audio)}
          onError={() => setAudio(defaultAudio)}
        />
      )}
      {
        !isApproaching ? (
          <div>
            <span>{textOrderDeparturePoint((d?.["order_departure_point"] ?? -1))}</span>
            <span>{" "}</span>
            <span>{Util.diffToHuman(moment(d?.["expected_arrival_time"]))}</span>
          </div>
        ) : (
          <div>
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
