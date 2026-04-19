import {createContext, useCallback, useState} from 'react';
import PropTypes from 'prop-types';

export const BreadcrumbContext = createContext();

export const BreadcrumbProvider = ({children}) => {
  const [labels, setLabels] = useState({});
  
  const setLabel = useCallback((key, value) => {
    setTimeout(() => {
      setLabels(prev => {
        if (prev[key] === value) return prev;
        return {...prev, [key]: value};
      });
    }, 0);
  }, []);
  
  return (
    <BreadcrumbContext.Provider value={{labels, setLabel}}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

BreadcrumbProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
