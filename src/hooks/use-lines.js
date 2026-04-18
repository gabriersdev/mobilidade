import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../assets/config.js';

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

      let apiURL = `${config.host}/api/lines`;
      if (variant === 'main') {
        apiURL = `${config.host}/api/lines/main`;
      }

      try {
        const response = await axios.get(apiURL);
        const fetchedData = response.data;
        cache.set(variant, fetchedData);
        setData(fetchedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLines();
  }, [variant]);

  return { data, error, loading };
};

export default useLines;
