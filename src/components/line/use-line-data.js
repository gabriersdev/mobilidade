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
        
        // Verifica se é um UUID (padrão 36 caracteres com hifens)
        const isUuid = typeof finalId === 'string' && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(finalId);
        
        if (!isUuid) {
          // Se não for UUID, assumimos que é o número da linha ou formato 'linha-XXXX'
          let searchTerm = typeof finalId === 'string' ? finalId.replace('linha-', '') : finalId;
          
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
