import {useState, useEffect} from 'react';
import apiClient from "@/assets/axios-config.js";

export function useHistoryData(lineId, fetchHistoryFn) {
  const [error, setError] = useState(null);
  const [loaded, setIsLoaded] = useState(true);
  const [data, setData] = useState([]);
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setIsLoaded(true);
      setError(null);
      try {
        const line = await apiClient.post(`/lines/`, {id: lineId});
        setLineData(line.data);
        
        if (fetchHistoryFn) {
          const response = await fetchHistoryFn();
          setData(response.data?.[0]);
        } else {
          setData([1]); // default fallback behavior seen in other files
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error);
      } finally {
        setIsLoaded(false);
      }
    };

    if (lineId) {
      getData();
    }
  }, [lineId, fetchHistoryFn]);

  return { error, loaded, data, setData, lineData };
}
