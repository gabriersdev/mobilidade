import {useState, useEffect} from 'react';
import axios from 'axios';
import config from '../../assets/config.js';

export const useLineData = (id) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const searchLine = async (id) => {
      try {
        const response = await axios.post(`${config.host}/api/lines/`, {id: id});
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error);
      } finally {
        setIsLoaded(false);
      }
    };

    searchLine(id);
  }, [id]);

  return {data, error, isLoaded};
};
