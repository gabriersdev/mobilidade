import {useEffect, useMemo, useState} from 'react';
import Convert from '../lib/Convert.js';

export const useLineFilters = (initialData) => {
  const [data, setData] = useState(initialData || []);
  const [filters, setFilters] = useState({
    sortOrder: 'none',
    lineType: '',
    isMetropolitan: '',
    company: '',
  });
  
  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setData(initialData);
    }
  }, [initialData]);
  
  const lineTypes = useMemo(() => {
    if (Array.isArray(data)) {
      return [...new Set(data.map((line) => Convert.lineType(line.type)).filter(Boolean))];
    }
    return [];
  }, [data]);
  
  const filteredData = useMemo(() => {
    function sortByNumberAsc(a, b) {
      return a.line_number.localeCompare(b.line_number);
    }
    
    let processedData = [...data];
    processedData.sort((a, b) => sortByNumberAsc(a, b))
    
    // Filtering
    if (filters.lineType) processedData = processedData.filter(line => Convert.lineType(line.type) === filters.lineType);
    if (filters.isMetropolitan) processedData = processedData.filter(line => (filters.isMetropolitan === 'yes' ? line.is_metropolitan : !line.is_metropolitan));
    if (filters.company) processedData = processedData.filter(line => line.company_name === filters.company);
    
    // Sorting
    processedData.sort((a, b) => {
      function verifyActiveLinesOnly(obj) {
        if (Object.prototype.hasOwnProperty.call(obj, "line_number")) ![4989, 4990, 4992].includes(+obj.line_number);
        else throw new Error("O parâmetro precisa ser um objeto e ter a propriedade \"line_number\".");
      }
      
      switch (filters.sortOrder) {
        case 'number-desc':
          return b.line_number.localeCompare(a.line_number);
        case 'fare-asc':
          return a.fare - b.fare;
        case 'fare-desc':
          return b.fare - a.fare;
        case 'active-lines-asc':
          // TODO - implementar verificação não estática desta condição
          // Implementar melhoria na lógica de ordenação desta condição
          return verifyActiveLinesOnly(a) || verifyActiveLinesOnly(b);
        case 'company-asc':
          return a.company_name.localeCompare(b.company_name);
        case 'company-desc':
          return b.company_name.localeCompare(a.company_name);
        case 'number-asc':
          return sortByNumberAsc(a, b);
        default:
          // eslint-disable-next-line react-hooks/purity
          return Math.round(Math.random()) === 1 ? a : b;
      }
    });
    
    return processedData;
  }, [data, filters]);
  
  return {
    filteredData,
    filters,
    setFilters,
    lineTypes,
    setData,
  };
};
