import {useEffect, useState} from 'react';
import axios from 'axios';
import config from '@/assets/config.js';

export function useFareHistory(id) {
  const [data, setData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const isValidId = (id) => {
    return id && id.match(/\\d/g);
  };
  
  useEffect(() => {
    if (!isValidId(id)) {
      setLoading(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        const response = {data: [[1]]}; // Mocked response
        const line = await axios.post(`${config.host}/api/lines/`, {id});
        
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
