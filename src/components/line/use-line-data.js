import {useState, useEffect} from 'react';
import apiClient from '@/assets/axios-config.js';

export const useLineData = (id) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const searchLine = async (id) => {
      setIsLoaded(true);
      setError(null);
      setData([]);
      try {
        let finalId = id;
        
        const finalIdStr = String(finalId);
        
        // Verifica se a busca deve ser feita pelo número da linha
        // Isso ocorre apenas se o ID tiver exatamente 4 dígitos ou começar com 'linha-'
        const isLineNumberSearch = finalIdStr.startsWith('linha-') || /^\d{4}$/.test(finalIdStr);
        
        if (isLineNumberSearch) {
          let searchTerm = finalIdStr.replace('linha-', '');
          
          const searchResponse = await apiClient.post(`/lines/search/`, {search: searchTerm});
          if (searchResponse.data && searchResponse.data.length > 0) {
            finalId = searchResponse.data[0].line_id;
          } else {
            setData([]);
            setIsLoaded(false);
            return;
          }
        }
        
        // Faz a busca da linha pelo verdadeiro UUID
        const response = await apiClient.post(`/lines/`, {id: finalId});
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
