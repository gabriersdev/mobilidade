import {useCallback, useEffect, useRef, useState} from "react";
import moment from "moment";
import axios from "axios";

import config from "../../assets/config.js";
import Util from "../../assets/Util.jsx";
import {useLocation} from "react-router-dom";

moment.locale("pt-BR");

const useLiveComponent = () => {
  const [lineSelected, setLineSelected] = useState(null);
  const [departurePointSelected, setDeparturePointSelected] = useState(null);
  const [data, setData] = useState([]);
  const [dataNextDepartureTimes, setDataNextDepartureTimes] = useState([]);
  const [error, setError] = useState(null);
  const [lines, setLines] = useState(null);
  const [departurePoints, setDeparturePoints] = useState(null);
  const [configs, setConfigs] = useState({
    warningSound: true,
    showSomeDepartureStart: false,
    showAdditionalInfo: true,
    volume: 70
  });
  const labelsConfigs = useRef({
    warningSound: "Aviso sonoro",
    showSomeDepartureStart: "Exibir apenas partidas",
    showAdditionalInfo: "Exibir informações extras",
    volume: "Volume do aviso sonoro"
  })
  
  const location = useLocation();
  const [searchDPId, setSearchDPId] = useState(-1);
  
  const [isOriginalFetch, setIsOriginalFetch] = useState(false);
  const [datetimeOriginalFetch, setDatetimeOriginalFetch] = useState(null);
  const [now, setNow] = useState(moment());
  
  const fetchInitialData = useCallback(async () => {
    await axios.get(`${config.host}/api/lines/`).then((c) => {
      setLines(c.data.map(c => {
        return {
          id: c?.["line_id"] ?? -1,
          title: Util.renderText((c?.["line_number"] + " - ") + (c?.["line_name"] ?? "")),
          name: Util.renderText(c?.["departure_location"] + " ⇄ " + c?.["destination_location"])
        }
      }));
    }).catch((error) => {
      setError(error);
    });
    
    await axios.get(`${config.host}/api/physical-departure-points/`).then((c) => {
      setDeparturePoints(c.data?.[0].map(c => {
        return {
          id: c?.["stop_id"] ?? -1,
          title: (((c?.["stop_name"] ? c?.["stop_name"] + " - " : "") + " " + c?.["address"])?.trim() ?? "").replaceAll("/", " - "),
          name: (c?.["address"]?.trim() ?? "").replaceAll("/", " - "),
        }
      }));
    }).catch((error) => {
      setError(error);
    });
  }, []);
  
  const parseDatetimeTimezone = useCallback((d) => {
    return {
      ...d,
      "departure_time_trip": parseInt(import.meta.env?.["VITE_MODE"], 10) === 0 ? d?.["departure_time_trip"].replace("Z", "-03:00") : d?.["departure_time_trip"],
      "expected_arrival_time": parseInt(import.meta.env?.["VITE_MODE"], 10) === 0 ? d?.["expected_arrival_time"].replace("Z", "-03:00") : d?.["expected_arrival_time"],
    }
  }, []);
  
  const fetchData = async (departurePointSelected) => {
    // Força a perda de foco de todos os inputs
    document.querySelectorAll("input")?.forEach(i => i.blur());
    if (!departurePointSelected) return;
    const s = await axios.post(`${config.host}/api/predictions/departure-points/`, {
      pointId: departurePointSelected?.["id"] ?? -1
    }).catch((error) => {
      console.log("Error", error);
      setError(error);
      setIsOriginalFetch(false);
      setDatetimeOriginalFetch(null);
      return false;
    });
    
    setIsOriginalFetch(true);
    setDatetimeOriginalFetch(moment());
    
    const axiosMainData = s?.data[0]?.[0]?.[0]?.["get_arrival_predictions(?, ?)"];
    const axiosNextDepartureTimes = s?.data[1]?.[0]?.[0]?.["@out"];
    
    if (Array.isArray(axiosMainData)) setData(JSON.parse(JSON.stringify(axiosMainData)).map(parseDatetimeTimezone));
    if (Array.isArray(JSON.parse(axiosNextDepartureTimes))) setDataNextDepartureTimes(JSON.parse(axiosNextDepartureTimes).map(parseDatetimeTimezone));
    setError(null);
  };
  
  const fetchPhysicalPointId = async (pointId) => {
    const s = await axios.post(`${config.host}/api/departure-points/physical-point`, {pointId})
      .catch((error) => {
        console.log(error);
        setError("Ocorreu um erro ao consultar o banco de dados");
      });
    return s?.data?.[0]?.[0]?.["physical_stop_id"];
  }
  
  const resultSection = useRef();
  
  // useEffect(() => {
  //   if (dataNextDepartureTimes) console.log(dataNextDepartureTimes);
  // }, [dataNextDepartureTimes]);
  
  useEffect(() => {
    if (departurePointSelected) {
      fetchData(departurePointSelected).then(() => {
      });
    } else {
      setData(null);
      setDataNextDepartureTimes(null);
    };
  }, [departurePointSelected]);
  
  useEffect(() => {
    if (!lines && !departurePoints) fetchInitialData().then();
  }, [lines, departurePoints, lineSelected, fetchInitialData]);
  
  useEffect(() => {
    if (data && isOriginalFetch) {
      const original = JSON.parse(JSON.stringify(data));
      setIsOriginalFetch(false);
      setData(original);
    }
  }, [data, isOriginalFetch]);
  
  useEffect(() => {
    // TODO - existe um bug quando troca o ponto observado os próximos horários (depois...) não são atualizados como deviam, e continuam recebendo os dados do ponto anterior consultado.
    let int;
    
    if (departurePointSelected && datetimeOriginalFetch) {
      try {
        clearInterval(int);
      } catch {
        //
      }
      
      int = setInterval(() => {
        if (moment().diff(datetimeOriginalFetch, "seconds") % 60) fetchData(departurePointSelected).then();
      }, 1000 * 30);
    }
    
    //
    else {
      try {
        clearInterval(int);
      } catch {
        //
      }
    }
    
    return () => {
      clearInterval(int);
    }
  }, [departurePointSelected, datetimeOriginalFetch]);
  
  useEffect(() => {
    // Quando location search tiver algum valor, analisa se o parâmetro "ei" foi passado e se existe nele algum número para consultar o ponto
    if (location.search && location.search !== "") {
      const searchParams = new URLSearchParams(location.search)
      let getSearchParamId;
      if (searchParams) getSearchParamId = searchParams.get("ei")
      if (getSearchParamId.match(/\d/)) setSearchDPId(+getSearchParamId.match(/\d/g).join(""));
    }
  }, [location]);
  
  useEffect(() => {
    if (searchDPId >= 0 && departurePoints) {
      fetchPhysicalPointId(searchDPId).then(physicalPointId => {
        const correspondence = departurePoints.find(dp => dp.id === physicalPointId);
        if (correspondence) setDeparturePointSelected(correspondence);
      });
    }
  }, [searchDPId, departurePoints]);
  
  useEffect(() => {
    // Altera o título da página
    document.title = "Mobilidade - Ao Vivo";
    Util.updateActiveLink();
    
    let int;
    
    int = setInterval(() => {
      setNow(moment());
    }, 1000);
    
    // Impedir que dispositivo entre em suspensão
    if ('wakeLock' in navigator) {
      let wakeLock = null;
      
      async function requestWakeLock() {
        try {
          wakeLock = await navigator.wakeLock.request('screen');
          wakeLock.addEventListener('release', () => {
            console.log('[INFO] - Wake Lock foi liberado');
          });
          console.log('[INFO] - Wake Lock ativado');
        } catch (err) {
          console.error('[FAIL] - Falha ao ativar o Wake Lock:', err);
        }
      }
      
      // Solicitar Wake Lock assim que a página for carregada
      requestWakeLock().then();
    } else {
      console.log('[INFO] - API de Wake Lock não suportada neste navegador');
    }
    
    return () => {
      clearInterval(int);
    }
  }, []);
  
  return {
    lineSelected,
    setLineSelected,
    departurePointSelected,
    setDeparturePointSelected,
    data,
    setData,
    dataNextDepartureTimes,
    setDataNextDepartureTimes,
    error,
    setError,
    lines,
    setLines,
    departurePoints,
    setDeparturePoints,
    isOriginalFetch,
    setIsOriginalFetch,
    datetimeOriginalFetch,
    setDatetimeOriginalFetch,
    now,
    setNow,
    resultSection,
    configs,
    setConfigs,
    labelsConfigs,
    
    fetchData
  }
}

export default useLiveComponent;
