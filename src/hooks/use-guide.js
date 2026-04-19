import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import config from '@/assets/config.js';
import Util from '@/assets/Util.jsx';
import {useLocation} from 'react-router-dom';

const GENERIC_ERROR = "Ocorreu um erro na consulta do Guia. Aguarde alguns minutos e tente novamente mais tarde.";

export const useGuide = () => {
  const [originalData, setOriginalData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  
  const fetchAddress = async (url, params) => {
    try {
      const response = await axios.post(url, params);
      return response.data?.[0]?.[0]?.address;
    } catch (err) {
      console.error("Erro ao buscar endereço:", err);
      setError("Ocorreu um erro ao consultar o endereço.");
      return null;
    }
  };
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.host}/api/guide`);
      if (response.data) {
        setOriginalData(response.data);
        setFilteredData(response.data);
      } else {
        setError(GENERIC_ERROR);
      }
    } catch (err) {
      console.error(err);
      setError(GENERIC_ERROR);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  useEffect(() => {
    const searchDPId = Util.getSearchParamId(location);
    if (searchDPId !== null && Object.keys(originalData).length > 0) {
      if (typeof searchDPId === 'string' && searchDPId.endsWith("S")) {
        const physicalId = +searchDPId.match(/\\d/g).join("");
        // This function was not fully implemented in the original component, so we are calling a placeholder.
        // You might need to implement fetchPhysicalPointAddressByPhysicalId in a similar way to fetchAddress.
      } else if (searchDPId >= 0) {
        fetchAddress(`${config.host}/api/departure-points/physical-point`, {pointId: searchDPId}).then(address => {
          if (address) setSearchTerm(address);
        });
      }
    }
  }, [location, originalData]);
  
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(originalData);
      return;
    }
    
    const lowercasedTerm = searchTerm.toLowerCase().trim();
    const results = Object.entries(originalData).reduce((acc, [key, value]) => {
      if (key.toLowerCase().includes(lowercasedTerm)) {
        acc[key] = value;
      }
      return acc;
    }, {});
    
    setFilteredData(results);
  }, [searchTerm, originalData]);
  
  return {data: filteredData, loading, error, searchTerm, setSearchTerm, originalData};
};
