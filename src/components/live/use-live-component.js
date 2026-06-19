import {useEffect, useRef, useState} from "react";
import moment from "moment";
import Util from "../../lib/Util.jsx";
import {useLocation} from "react-router-dom";
import {dateConfigs} from "@/assets/resources.js";
import { useLiveConfigs } from "./use-live-configs.js";
import { useWakeLock } from "./use-wake-lock.js";
import { useLiveData } from "./use-live-data.js";

moment.locale(dateConfigs.lang);

const useLiveComponent = () => {
  const [lineSelected, setLineSelected] = useState(null);
  const [departurePointSelected, setDeparturePointSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { configs, setConfigs, labelsConfigs } = useLiveConfigs();
  useWakeLock();
  
  const {
    data, setData,
    dataNextDepartureTimes, setDataNextDepartureTimes,
    error, setError,
    loading, setLoading,
    lines, setLines,
    departurePoints, setDeparturePoints,
    isOriginalFetch, setIsOriginalFetch,
    datetimeOriginalFetch, setDatetimeOriginalFetch,
    fetchInitialData, fetchData, fetchPhysicalPointId
  } = useLiveData(departurePointSelected);
  
  const location = useLocation();
  const [searchDPId, setSearchDPId] = useState(-1);
  const [now, setNow] = useState(moment());
  const resultSection = useRef();
  
  useEffect(() => {
    if (searchTerm && (lines || departurePoints)) {
      const searchTermLower = searchTerm.toLowerCase();
      
      const foundLine = lines?.find(line =>
        line.title.toLowerCase().includes(searchTermLower) ||
        line.name.toLowerCase().includes(searchTermLower)
      );
      
      if (foundLine) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLineSelected(foundLine);
        return;
      }
      
      const foundDP = departurePoints?.find(dp =>
        dp.title.toLowerCase().includes(searchTermLower) ||
        dp.name.toLowerCase().includes(searchTermLower)
      );
      
      if (foundDP) setDeparturePointSelected(foundDP);
    }
  }, [searchTerm, lines, departurePoints]);

  useEffect(() => {
    if (!lines && !departurePoints) fetchInitialData(setDeparturePointSelected).then();
  }, [lines, departurePoints, lineSelected, fetchInitialData]);
  
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
    document.title = "Mobilidade - Ao Vivo";
    Util.updateActiveLink();
    
    let int = setInterval(() => {
      setNow(moment());
    }, 1000);
    
    return () => clearInterval(int);
  }, []);
  
  return {
    lineSelected, setLineSelected,
    departurePointSelected, setDeparturePointSelected,
    searchTerm, setSearchTerm,
    data, setData,
    dataNextDepartureTimes, setDataNextDepartureTimes,
    error, setError,
    loading, setLoading,
    lines, setLines,
    departurePoints, setDeparturePoints,
    isOriginalFetch, setIsOriginalFetch,
    datetimeOriginalFetch, setDatetimeOriginalFetch,
    now, setNow,
    resultSection,
    configs, setConfigs, labelsConfigs,
    fetchData
  }
}

export default useLiveComponent;
