import {useEffect, useState} from 'react';
import axios from 'axios';
import config from '@/assets/config.js';

export const useCompany = (id) => {
  const [data, setData] = useState(null);
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        const [companyRes, linesRes] = await Promise.all([
          axios.post(`${config.host}/api/company/`, {company_id: id}),
          axios.post(`${config.host}/api/company/lines`, {company_id: id})
        ]);
        setData(companyRes.data[0]);
        setLines(linesRes.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  return {data, lines, loading, error};
};
