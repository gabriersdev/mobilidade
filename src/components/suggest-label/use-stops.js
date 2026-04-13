import {useEffect, useState} from 'react';
import axios from 'axios';
import config from '../../assets/config.js';

export const useStops = () => {
  const [stops, setStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState(null);
  
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
    
    fetchStops();
  }, []);
  
  return {stops, selectedStop, setSelectedStop};
};
