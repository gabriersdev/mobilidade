import { useState, useCallback, useEffect } from "react";
import apiClient from "@/assets/axios-config.js";
import Util from "../../lib/Util.jsx";
import moment from "moment";

export const useLiveData = (departurePointSelected) => {
  const [data, setData] = useState([]);
  const [dataNextDepartureTimes, setDataNextDepartureTimes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lines, setLines] = useState(null);
  const [departurePoints, setDeparturePoints] = useState(null);
  const [isOriginalFetch, setIsOriginalFetch] = useState(false);
  const [datetimeOriginalFetch, setDatetimeOriginalFetch] = useState(null);

  const fetchInitialData = useCallback(async (setDeparturePointSelected) => {
    await apiClient.get(`/lines/`).then((c) => {
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
    
    await apiClient.get(`/physical-departure-points/`).then((c) => {
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

  const fetchData = async (pointSelected, isRefresh = false) => {
    if (!pointSelected) return;
    if (!isRefresh) setLoading(true);
    
    const s = await apiClient.post(`/predictions/departure-points/`, {
      pointId: pointSelected?.["id"] ?? -1
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
    
    if (Array.isArray(axiosMainData)) setData(JSON.parse(JSON.stringify(axiosMainData)).map(Util.parseDatetimeTimezone));
    else setData([]);
    
    if (Array.isArray(JSON.parse(axiosNextDepartureTimes))) {
      setDataNextDepartureTimes(JSON.parse(axiosNextDepartureTimes).map(Util.parseDatetimeTimezone));
    } else {
      setDataNextDepartureTimes([]);
    }
    
    setError(null);
    if (!isRefresh) setLoading(false);
  };

  const fetchPhysicalPointId = async (pointId) => {
    const s = await apiClient.post(`/departure-points/physical-point`, {pointId})
      .catch((error) => {
        console.log(error);
        setError("Ocorreu um erro ao consultar o banco de dados");
      });
    return s?.data?.[0]?.[0]?.["physical_stop_id"];
  }

  // Effect to reset and fetch data on point change
  useEffect(() => {
    if (departurePointSelected) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData([]);
      setDataNextDepartureTimes([]);
      fetchData(departurePointSelected, false).then(() => {});
    } else {
      setData(null);
      setDataNextDepartureTimes(null);
    }
   
  }, [departurePointSelected]);

  // Effect to restore data when original fetch flag is true
  useEffect(() => {
    if (data && isOriginalFetch) {
      const original = JSON.parse(JSON.stringify(data));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOriginalFetch(false);
      setData(original);
    }
  }, [data, isOriginalFetch]);

  // Effect for polling interval
  useEffect(() => {
    let int = setInterval(() => {}, 100000);
    
    if (departurePointSelected && datetimeOriginalFetch) {
      try { clearInterval(int); } catch { /* ignore */ }
      
      int = setInterval(() => {
        if (moment().diff(datetimeOriginalFetch, "seconds") % 60) fetchData(departurePointSelected, true).then();
      }, 1000 * 30);
    } else {
      try { clearInterval(int); } catch { /* ignore */ }
    }
    
    return () => clearInterval(int);
   
  }, [departurePointSelected, datetimeOriginalFetch]);

  return {
    data, setData,
    dataNextDepartureTimes, setDataNextDepartureTimes,
    error, setError,
    loading, setLoading,
    lines, setLines,
    departurePoints, setDeparturePoints,
    isOriginalFetch, setIsOriginalFetch,
    datetimeOriginalFetch, setDatetimeOriginalFetch,
    fetchInitialData, fetchData, fetchPhysicalPointId
  };
};
