import {useState, useEffect} from 'react';
import axios from 'axios';
import config from '../../assets/config.js';
import PropTypes from "prop-types";
import moment from "moment";

moment.locale("pt-BR");

const useDepartureTimes = (line_id, variant) => {
  const [data, setData] = useState([]);
  const [observations, setObservations] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true); // Inicia como true, carregando
  
  useEffect(() => {
    const fetchDepartureTimes = async () => {
      try {
        const [departureTimesResponse, departureTimesObservationsResponse] = await Promise.all([
          axios.post(variant && variant.type === "history" ? `${config.host}/api/history/lines` : `${config.host}/api/departure_times/`, variant && variant.type === "history" ? {id: line_id, departureTimeDate: variant.departureTimeDate} : {line_id}),
          axios.post(`${config.host}/api/departure_times_observations/`, {line_id}),
        ]);
        
        const departureTimesData = departureTimesResponse.data;
        const observationsData = departureTimesObservationsResponse.data;
        
        const uniqueObservations = observationsData
          .filter(o => o?.["observation"] !== null)
          .reduce((accumulator, observation) => {
            if (!accumulator.some(item => item.label === observation?.["observation_name"])) {
              accumulator.push({
                label: observation?.["observation_name"],
                abrev: observation?.["observation_abrev"],
              });
            }
            return accumulator;
          }, []);
        
        setObservations(uniqueObservations);
        
        const enhancedDepartureTimes = departureTimesData.map(item => {
          const itemObservations = observationsData.filter(
            observation => observation?.["departure_time_id"] === item?.["schedule_id"]
          );
          
          return {
            ...item,
            observations: itemObservations.length
              ? itemObservations.map(observation => {
                const index = uniqueObservations.findIndex(
                  o => o.label === observation?.["observation_name"]
                );
                return {
                  abrev: observation?.["observation_abrev"],
                  label: observation?.["observation_name"],
                  index: index !== -1 ? index : 0, // Garante um índice padrão se não encontrado
                };
              })
              : null,
          };
        });
        
        setData(enhancedDepartureTimes);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error);
      } finally {
        setIsLoaded(false); // Define como false após o carregamento (com ou sem erro)
      }
    };
    
    fetchDepartureTimes().then();
  }, [line_id, variant]);
  
  // Calcula o horário da partida e verifica se é noturno
  // Se for, adiciona às observações
  useEffect(() => {
    if (observations && Array.isArray(observations)) {
      if (!(data && Array.isArray(data))) return;
      const newDataThinking = data.map((d) => {
        const originalDepartureTime = moment(`2020-01-01T${d?.["departure_time"] || "05:00:00"}`);
        const time = originalDepartureTime.isValid() ? +(originalDepartureTime.format("HH")) : 5;
        if (time >= 0 && time < 3) return {...d, observations: [...(d.observations ? d.observations : []), {"abrev": "NOT", "label": "Horário noturno. Veículo com capacidade reduzida e itinerário pode ser diferente do normal.", index: 14780142}]}
        return d;
      });
      // console.log(newDataThinking);
      setData(newDataThinking);
    }
  }, [observations]);
  
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
