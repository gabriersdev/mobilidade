import {useCallback, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

import Util from '@/lib/Util.jsx';
import apiClient from "@/assets/axios-config.js";

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
      const response = await apiClient.post(url, params);
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
      const response = await apiClient.get(`/guide`);
      if (response.data) {
        const normalized = {};
        for (const [key, value] of Object.entries(response.data)) {
          let cleanKey = key.trim().replace(/\s+/g, ' ');
          if (cleanKey.length > 0) {
            cleanKey = cleanKey.charAt(0).toUpperCase() + cleanKey.slice(1);
          }
          
          const existingKey = Object.keys(normalized).find(
            k => k.toLowerCase() === cleanKey.toLowerCase()
          );
          
          if (existingKey) {
            const mergedLines = [...normalized[existingKey], ...value];
            const uniqueLinesMap = new Map();
            mergedLines.forEach(line => {
              if (line && line.lineId) {
                uniqueLinesMap.set(line.lineId, line);
              } else if (line) {
                uniqueLinesMap.set(JSON.stringify(line), line);
              }
            });
            normalized[existingKey] = Array.from(uniqueLinesMap.values());
          } else {
            normalized[cleanKey] = [...value];
          }
        }
        setOriginalData(normalized);
        setFilteredData(normalized);
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData().then();
  }, [fetchData]);
  
  useEffect(() => {
    const searchDPId = Util.getSearchParamId(location);
    if (searchDPId !== null && Object.keys(originalData).length > 0) {
      if (typeof searchDPId === 'string' && searchDPId.endsWith("S")) {
        // const physicalId = +searchDPId.match(/\\d/g).join("");
        // This function was not fully implemented in the original component, so we are calling a placeholder.
        // You might need to implement fetchPhysicalPointAddressByPhysicalId in a similar way to fetchAddress.
      } else if (searchDPId >= 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchAddress(`/departure-points/physical-point`, {pointId: searchDPId}).then(address => {
          if (address) setSearchTerm(address);
        });
      }
    }
  }, [location, originalData]);
  
  useEffect(() => {
    if (!searchTerm) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilteredData(originalData);
      return;
    }
    
    const lowercasedTerm = searchTerm.toLowerCase().trim();
    const results = Object.entries(originalData).reduce((acc, [key, value]) => {
      if (key.toLowerCase().includes(lowercasedTerm)) acc[key] = value;
      return acc;
    }, {});
    
    setFilteredData(results);
  }, [searchTerm, originalData]);
  
  return {data: filteredData, loading, error, searchTerm, setSearchTerm, originalData};
};
