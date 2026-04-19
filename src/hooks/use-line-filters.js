import { useState, useEffect, useMemo } from 'react';
import Convert from '../assets/Convert.js';

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
    let processedData = [...data];

    // Filtering
    if (filters.lineType) {
      processedData = processedData.filter(line => Convert.lineType(line.type) === filters.lineType);
    }
    if (filters.isMetropolitan) {
      processedData = processedData.filter(line => (filters.isMetropolitan === 'yes' ? line.is_metropolitan : !line.is_metropolitan));
    }
    if (filters.company) {
      processedData = processedData.filter(line => line.company_name === filters.company);
    }

    // Sorting
    processedData.sort((a, b) => {
      switch (filters.sortOrder) {
        case 'number-desc':
          return b.line_number.localeCompare(a.line_number);
        case 'fare-asc':
          return a.fare - b.fare;
        case 'fare-desc':
          return b.fare - a.fare;
        case 'number-asc':
        default:
          return a.line_number.localeCompare(b.line_number);
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
