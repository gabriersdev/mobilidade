import { createContext, useState, useContext, useCallback } from 'react';
import PropTypes from "prop-types";

const BreadcrumbContext = createContext();

export const BreadcrumbProvider = ({ children }) => {
  const [labels, setLabels] = useState({});

  const setLabel = useCallback((key, value) => {
    // Use setTimeout to defer the state update to the next tick
    // This avoids "Cannot update a component while rendering a different component"
    setTimeout(() => {
      setLabels(prev => {
        if (prev[key] === value) return prev;
        return { ...prev, [key]: value };
      });
    }, 0);
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
