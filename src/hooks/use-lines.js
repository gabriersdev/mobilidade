import {useEffect, useState} from 'react';
import apiClient from "@/assets/axios-config.js";

const cache = new Map();

const useLines = (variant = 'all', params = {}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchLines = async () => {
      const cacheKey = variant + JSON.stringify(params);
      if (cache.has(cacheKey)) {
        setData(cache.get(cacheKey));
        setLoading(false);
        return;
      }
      
      let apiURL = `/lines/`;
      let method = 'get';
      let payload = undefined;
      
      if (variant === 'main') {
        apiURL = `/lines/main`;
      } else if (variant === 'similar-lines') {
        apiURL = `/lines/similar-lines`;
        method = 'post';
        payload = params;
      }
      
      try {
        const response = method === 'post' 
          ? await apiClient.post(apiURL, payload) 
          : await apiClient.get(apiURL);
        const fetchedData = response.data;
        cache.set(cacheKey, fetchedData);
        setData(fetchedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLines().then();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, JSON.stringify(params)]);
  
  return {data, error, loading};
};

export default useLines;
