import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import config from "../../assets/config.js";
import Util from "../../assets/Util.jsx";

moment.locale("pt-BR");

const useSuggestLabel = () => {
  const [stops, setStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState(null);
  const [busTimes, setBusTimes] = useState([]);
  const [data, setData] = useState([]);
  const [now, setNow] = useState(moment());

  // Fetch stops (physical departure points)
  useEffect(() => {
    const fetchStops = async () => {
      try {
        const response = await axios.get(`${config.host}/api/physical-departure-points/`);
        const formattedStops = response.data?.[0].map(c => ({
          id: c?.["stop_id"] ?? -1,
          label: (((c?.["stop_name"] ? c?.["stop_name"] + " - " : "") + " " + c?.["address"])?.trim() ?? "").replaceAll("/", " - "),
          link: "#"
        })) || [];
        
        setStops(formattedStops.slice(0, 15));
        
        const defaultStop = formattedStops.find(s => s.id === 4095);
        if (defaultStop) {
          setSelectedStop(defaultStop);
        } else if (formattedStops.length > 0) {
          setSelectedStop(formattedStops[0]);
        }
      } catch (error) {
        console.error("Error fetching stops:", error);
      }
    };

    fetchStops().then();
  }, []);

  const fetchData = useCallback(async () => {
    if (!selectedStop) return;

    try {
      const response = await axios.post(`${config.host}/api/predictions/departure-points/`, {
        pointId: selectedStop.id
      });

      const axiosMainData = response?.data[0]?.[0]?.[0]?.["get_arrival_predictions(?, ?)"];
      
      if (Array.isArray(axiosMainData)) {
        const parsedData = JSON.parse(JSON.stringify(axiosMainData)).map(Util.parseDatetimeTimezone);
        setData(parsedData);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setData([]);
    }
  }, [selectedStop]);

  // Update busTimes based on data and now
  useEffect(() => {
    if (!data || data.length === 0) {
      setBusTimes([]);
      return;
    }

    // Filter for future arrivals and sort by time
    const times = data
      .filter(d => moment(d?.["expected_arrival_time"]).isAfter(now))
      .sort((a, b) => moment(a?.["expected_arrival_time"]).diff(moment(b?.["expected_arrival_time"])))
      .slice(0, 3) // Limit to 3 items
      .map((d, index) => {
        const diffMinutes = moment(d?.["expected_arrival_time"]).diff(now, 'minutes');
        let timeLabel;
        let infoLabel = "aprox.";
        
        if (d?.["order_departure_point"] === d?.["total_departure_points"]) return
        else if ([0, 1].includes(d?.["order_departure_point"])) infoLabel = "saí"
        
        if (diffMinutes <= 0) timeLabel = "agora";
        else timeLabel = `em ${diffMinutes} min`;

        return {
          id: `${d.line_id}_${index}`,
          label: `${d.line_number} ${infoLabel} ${timeLabel}`.replace(/,/, ''),
          link: `/lines/${d.line_id}`
        };
      }).filter(d => d);
      
    setBusTimes(times);

  }, [data, now]);

  // Fetch data every 30 seconds
  useEffect(() => {
    fetchData().then();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Update 'now' every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    stops,
    selectedStop,
    setSelectedStop,
    busTimes
  };
};

export default useSuggestLabel;
