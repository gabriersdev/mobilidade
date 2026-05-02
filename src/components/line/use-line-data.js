import {useState, useEffect} from 'react';
import apiClient from '@/assets/axios-config.js';

export const useLineData = (id) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const searchLine = async (id) => {
      try {
        // Usa a instância apiClient, que já tem a baseURL e withCredentials configurados
        const response = await apiClient.post(`/lines/`, {id: id});
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        // O tratamento do erro 401 agora é feito globalmente pelo interceptor do apiClient
        setError(error);
      } finally {
        setIsLoaded(false);
      }
    };

    searchLine(id);
  }, [id]);

  return {data, error, isLoaded};
};
