import React, {createContext, useState, useEffect} from 'react';
import Config from "@/assets/config.js";

export const CaptchaContext = createContext();

export const CaptchaProvider = ({children}) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkSessionStatus = async () => {
      try {
        const response = await fetch(Config.host + '/api/check-auth', {
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.isVerified) {
            setIsVerified(true);
          }
        } else if (response.status !== 401) {
          // Apenas loga erros que não são 'Não Autorizado'
          console.error(`Error checking session: ${response.status}`);
        }
      } catch (error) {
        // Erros de rede ou falhas na requisição
        console.error("Failed to fetch session status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSessionStatus();
  }, []);
  
  const setVerified = (verified) => {
    setIsVerified(verified);
  };
  
  if (isLoading) {
    return null;
  }
  
  return (
    <CaptchaContext.Provider value={{isVerified, setIsVerified: setVerified}}>
      {children}
    </CaptchaContext.Provider>
  );
};
