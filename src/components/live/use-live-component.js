import {useCallback, useEffect, useRef, useState} from "react";
import moment from "moment";
import axios from "axios";

import config from "../../assets/config.js";
import Util from "../../assets/Util.jsx";
import {useLocation} from "react-router-dom";
import {dateConfigs} from "@/assets/resources.js";

moment.locale(dateConfigs.lang);

// TODO - refatorar componente
const useLiveComponent = () => {
  const [lineSelected, setLineSelected] = useState(null);
  const [departurePointSelected, setDeparturePointSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [dataNextDepartureTimes, setDataNextDepartureTimes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lines, setLines] = useState(null);
  const [departurePoints, setDeparturePoints] = useState(null);
  const [configs, setConfigs] = useState(() => {
    const defaultConfig = {
      warningSound: true,
      showSomeDepartureStart: false,
      showAdditionalInfo: true,
      showSingleLine: false,
      // volume: 70
    };
    try {
      const savedConfigs = localStorage.getItem("live-configs");
      if (savedConfigs) {
        return {...defaultConfig, ...JSON.parse(savedConfigs)};
      }
    } catch (error) {
      console.error("Error reading configs from localStorage", error);
    }
    return defaultConfig;
  });
  const labelsConfigs = useRef({
    warningSound: "Aviso sonoro",
    showSomeDepartureStart: "Exibir apenas partidas",
    showAdditionalInfo: "Exibir informações extras",
    showSingleLine: "Exibir em linha única"
    // volume: "Volume do aviso sonoro"
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
      setDeparturePoints(c.data?.[0].map((c, index) => {
        const formattedObject = {
          id: c?.["stop_id"] ?? -1,
          title: (((c?.["stop_name"] ? c?.["stop_name"] + " - " : "") + " " + c?.["address"] + (index <= 14 ? ` ★` : ''))?.trim() ?? "").replaceAll("/", " - "),
          name: (c?.["address"]?.trim() ?? "").replaceAll("/", " - "),
        }
        
        if (formattedObject.id && parseInt(formattedObject.id, 10) === 4095) setDeparturePointSelected(formattedObject);
        return formattedObject;
      }));
    }).catch((error) => {
      setError(error);
    });
  }, []);
  
  const fetchData = async (departurePointSelected, isRefresh = false) => {
    if (!departurePointSelected) return;
    if (!isRefresh) {
      setLoading(true);
    }
    
    const s = await axios.post(`${config.host}/api/predictions/departure-points/`, {
      pointId: departurePointSelected?.["id"] ?? -1
    }).catch((error) => {
      console.log("Error", error);
      setError(error);
      setIsOriginalFetch(false);
      setDatetimeOriginalFetch(null);
      if (!isRefresh) setLoading(false);
      return false;
    });
    
    setIsOriginalFetch(true);
    setDatetimeOriginalFetch(moment());
    
    const axiosMainData = s?.data[0]?.[0]?.[0]?.["get_arrival_predictions(?, ?)"];
    const axiosNextDepartureTimes = s?.data[1]?.[0]?.[0]?.["@out"];
    
    if (Array.isArray(axiosMainData)) {
      setData(JSON.parse(JSON.stringify(axiosMainData)).map(Util.parseDatetimeTimezone));
    } else {
      setData([]);
    }
    
    if (Array.isArray(JSON.parse(axiosNextDepartureTimes))) {
      setDataNextDepartureTimes(JSON.parse(axiosNextDepartureTimes).map(Util.parseDatetimeTimezone));
    } else {
      setDataNextDepartureTimes([]);
    }
    
    setError(null);
    if (!isRefresh) {
      setLoading(false);
    }
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
  
  useEffect(() => {
    if (searchTerm && (lines || departurePoints)) {
      const searchTermLower = searchTerm.toLowerCase();
      
      // TODO - bolar lógica para busca e pesquisa de itens e centralizá-la
      const foundLine = lines?.find(line =>
        line.title.toLowerCase().includes(searchTermLower) ||
        line.name.toLowerCase().includes(searchTermLower)
      );
      
      if (foundLine) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLineSelected(foundLine);
        return;
      }
      
      // TODO - bolar lógica para busca e pesquisa de itens e centralizá-la
      const foundDP = departurePoints?.find(dp =>
        dp.title.toLowerCase().includes(searchTermLower) ||
        dp.name.toLowerCase().includes(searchTermLower)
      );
      
      if (foundDP) setDeparturePointSelected(foundDP);
    }
  }, [searchTerm, lines, departurePoints]);
  
  useEffect(() => {
    try {
      localStorage.setItem("live-configs", JSON.stringify(configs));
    } catch (error) {
      console.error("Error saving configs to localStorage", error);
    }
  }, [configs]);
  
  useEffect(() => {
    if (departurePointSelected) {
      setData([]);
      setDataNextDepartureTimes([]);
      fetchData(departurePointSelected, false).then(() => {
      });
    } else {
      setData(null);
      setDataNextDepartureTimes(null);
    }
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
    let int = setInterval(() => {
    }, 100000);
    
    if (departurePointSelected && datetimeOriginalFetch) {
      try {
        clearInterval(int);
      } catch {
        //
      }
      
      int = setInterval(() => {
        if (moment().diff(datetimeOriginalFetch, "seconds") % 60) fetchData(departurePointSelected, true).then();
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
    const id = Util.getSearchParamId(location);
    if (id !== null) setSearchDPId(id);
  }, [location]);
  
  useEffect(() => {
    let correspondence;
    let PPI;
    
    if (searchDPId && departurePoints) {
      if (typeof searchDPId === 'string' && searchDPId.endsWith("S")) {
        PPI = +searchDPId.match(/\d/g).join("");
        if (PPI) correspondence = departurePoints.find(dp => dp.id === PPI);
        if (correspondence) setDeparturePointSelected(correspondence);
      } else if (searchDPId >= 0) {
        fetchPhysicalPointId(searchDPId).then(physicalPointId => {
          PPI = physicalPointId
          if (PPI) correspondence = departurePoints.find(dp => dp.id === PPI);
          if (correspondence) setDeparturePointSelected(correspondence);
        });
      }
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
    searchTerm,
    setSearchTerm,
    data,
    setData,
    dataNextDepartureTimes,
    setDataNextDepartureTimes,
    error,
    setError,
    loading,
    setLoading,
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
