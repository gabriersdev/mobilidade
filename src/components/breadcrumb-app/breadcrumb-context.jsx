import { createContext, useState, useContext, useCallback } from 'react';
import PropTypes from "prop-types";

const BreadcrumbContext = createContext();

export const BreadcrumbProvider = ({ children }) => {
  const [labels, setLabels] = useState({});

  const setLabel = useCallback((key, value) => {
    setLabels(prev => {
      if (prev[key] === value) return prev;
      return { ...prev, [key]: value };
    });
  }, []);

  return (
    <BreadcrumbContext.Provider value={{ labels, setLabel }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

BreadcrumbProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useBreadcrumb = () => useContext(BreadcrumbContext);
