import {useState, useEffect} from 'react';
import axios from 'axios';
import config from '../../assets/config.js';
import PropTypes from "prop-types";
import moment from "moment";
import {dateConfigs} from "@/assets/resources.js";
import { extractUniqueObservations, enhanceDepartureTimes, applyNightObservations } from './departure-times-helpers.js';

moment.locale(dateConfigs.lang);

const useDepartureTimes = (line_id, variant) => {
  const [data, setData] = useState([]);
  const [observations, setObservations] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  
  useEffect(() => {
    const fetchDepartureTimes = async () => {
      setIsLoaded(true);
      setError(null);
      setData([]);
      setObservations([]);
      try {
        const isHistory = variant && variant.type === "history";
        const urlTimes = isHistory ? `${config.host}/api/history/lines` : `${config.host}/api/departure_times/`;
        const payloadTimes = isHistory ? {id: line_id, departureTimeDate: variant.departureTimeDate} : {line_id};
        
        const [departureTimesResponse, observationsResponse] = await Promise.all([
          axios.post(urlTimes, payloadTimes),
          axios.post(`${config.host}/api/departure_times_observations/`, {line_id}),
        ]);
        
        const departureTimesData = departureTimesResponse.data;
        const observationsData = observationsResponse.data;
        
        const uniqueObs = extractUniqueObservations(observationsData);
        setObservations(uniqueObs);
        
        const enhancedData = enhanceDepartureTimes(departureTimesData, observationsData, uniqueObs);
        setData(applyNightObservations(enhancedData));
        
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error);
      } finally {
        setIsLoaded(false);
      }
    };
    
    fetchDepartureTimes().then();
  }, [line_id, variant]);
  
  return {data, observations, error, isLoaded};
};

useDepartureTimes.propTypes = {
  line_id: PropTypes.number.isRequired,
  variant: PropTypes.shape({
    type: PropTypes.oneOf(["history", "current"]).isRequired,
    departureTimeData: PropTypes.string.isRequired
  }),
}

export default useDepartureTimes;
