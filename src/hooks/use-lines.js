import {useEffect, useState} from 'react';
import apiClient from "@/assets/axios-config.js";

const cache = new Map();

const useLines = (variant = 'all') => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchLines = async () => {
      if (cache.has(variant)) {
        setData(cache.get(variant));
        setLoading(false);
        return;
      }
      
      let apiURL = `/lines/`;
      if (variant === 'main') apiURL = `/lines/main`;
      
      try {
        const response = await apiClient.get(apiURL);
        const fetchedData = response.data;
        cache.set(variant, fetchedData);
        setData(fetchedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLines().then();
  }, [variant]);
  
  return {data, error, loading};
};

export default useLines;
