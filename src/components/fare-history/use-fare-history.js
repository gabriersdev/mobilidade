import {useEffect, useState} from 'react';
import apiClient from "@/assets/axios-config.js";

export function useFareHistory(id) {
  const [data, setData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const isValidId = (id) => {
    return id && id.match(/^\d+$/);
  };
  
  useEffect(() => {
    if (!isValidId(id)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        const response = {data: [[1]]}; // Mocked response
        const line = await apiClient.post(`/lines/`, {id});
        
        setData(response.data?.[0]);
        setLineData(line.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  return {data, lineData, error, loading, isValidId};
}
