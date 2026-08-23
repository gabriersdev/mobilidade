import {useCallback, useEffect, useState} from 'react';
import moment from 'moment';

import Util from '@/lib/Util.jsx';
import socket, { connectSocket, disconnectSocket } from '@/lib/socket.js';

export const useBusPredictions = (selectedStop) => {
  const [data, setData] = useState([]);
  const [busTimes, setBusTimes] = useState([]);
  const [now, setNow] = useState(moment());
  
  useEffect(() => {
    connectSocket();
    return () => disconnectSocket();
  }, []);

  useEffect(() => {
    if (!selectedStop) return;

    const handlePredictionsData = (response) => {
      try {
        const axiosMainData = response?.[0]?.[0]?.[0]?.["get_arrival_predictions(?, ?)"];
        setData(Array.isArray(axiosMainData) ? JSON.parse(JSON.stringify(axiosMainData)).map(Util.parseDatetimeTimezone) : []);
      } catch (error) {
        console.error("Error processing predictions data from socket:", error);
        setData([]);
      }
    };

    socket.on('predictions_data', handlePredictionsData);
    socket.emit('subscribe_predictions', { pointId: selectedStop.id });

    return () => {
      socket.off('predictions_data', handlePredictionsData);
      socket.emit('unsubscribe_predictions', { pointId: selectedStop.id });
    };
  }, [selectedStop]);
  
  useEffect(() => {
    const interval = setInterval(() => setNow(moment()), 1000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (!data || data.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBusTimes([]);
      return;
    }
    
    const times = data
      .filter(d => moment(d?.["expected_arrival_time"]).isAfter(now))
      .sort((a, b) => moment(a?.["expected_arrival_time"]).diff(moment(b?.["expected_arrival_time"])))
      .slice(0, 3)
      .map((d, index) => {
        const diffMinutes = moment(d?.["expected_arrival_time"]).diff(now, 'minutes');
        let timeLabel = diffMinutes <= 0 ? "agora" : `em ${diffMinutes} min`;
        let infoLabel = d?.["order_departure_point"] <= 1 ? "sai" : "aprox.";
        
        return {
          id: `${d.line_id}_${index}`,
          label: `${d.line_number} ${infoLabel} ${timeLabel}`.replace(/,/, ''),
          link: `/lines/${d.line_id}`
        };
      });
    
    setBusTimes(times);
  }, [data, now]);
  
  return busTimes;
};
