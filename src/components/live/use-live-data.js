import { useState, useCallback, useEffect } from "react";
import apiClient from "@/assets/axios-config.js";
import socket, { connectSocket, disconnectSocket } from '@/lib/socket.js';
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

  useEffect(() => {
    connectSocket();
    return () => disconnectSocket();
  }, []);

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

  const handlePredictionsData = useCallback((response) => {
    try {
      const axiosMainData = response?.[0]?.[0]?.[0]?.["get_arrival_predictions(?, ?)"];
      const axiosNextDepartureTimes = response?.[1]?.[0]?.[0]?.["@out"];
      
      if (Array.isArray(axiosMainData)) {
        setData(JSON.parse(JSON.stringify(axiosMainData)).map(Util.parseDatetimeTimezone));
      } else {
        setData([]);
      }
      
      if (axiosNextDepartureTimes && Array.isArray(JSON.parse(axiosNextDepartureTimes))) {
        setDataNextDepartureTimes(JSON.parse(axiosNextDepartureTimes).map(Util.parseDatetimeTimezone));
      } else {
        setDataNextDepartureTimes([]);
      }
      
      setIsOriginalFetch(true);
      setDatetimeOriginalFetch(moment());
      setError(null);
    } catch (err) {
      console.error("Error processing live data from socket:", err);
      setError("Erro ao processar dados.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchData = async (pointSelected, isRefresh = false) => {
    if (!pointSelected) return;
    if (!isRefresh) setLoading(true);
    socket.emit('subscribe_predictions', { pointId: pointSelected?.["id"] ?? -1 });
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
      setLoading(true);
      
      socket.on('predictions_data', handlePredictionsData);
      socket.emit('subscribe_predictions', { pointId: departurePointSelected.id });

      return () => {
        socket.off('predictions_data', handlePredictionsData);
        socket.emit('unsubscribe_predictions', { pointId: departurePointSelected.id });
      };
    } else {
      setData(null);
      setDataNextDepartureTimes(null);
    }
  }, [departurePointSelected, handlePredictionsData]);

  // Effect to restore data when original fetch flag is true
  useEffect(() => {
    if (data && isOriginalFetch) {
      const original = JSON.parse(JSON.stringify(data));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOriginalFetch(false);
      setData(original);
    }
  }, [data, isOriginalFetch]);

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
