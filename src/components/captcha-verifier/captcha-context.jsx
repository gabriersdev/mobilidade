import React, {createContext, useState, useContext, useEffect} from 'react';
import Config from "@/assets/config.js";

export const CaptchaContext = createContext();

export const CaptchaProvider = ({children}) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Verifica com o backend se a sessão já foi validada por um captcha anteriormente
    const checkSessionStatus = async () => {
      try {
        // Adicionado `credentials: 'include'` para enviar o cookie de sessão
        const response = await fetch(Config.host + '/api/check-auth', {
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok && data.isVerified) {
          setIsVerified(true);
        }
      } catch (error) {
        // A sessão não é verificada, o que é o estado padrão
        setIsVerified(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSessionStatus();
  }, []);
  
  // A função que atualiza o estado agora não precisa mais mexer no sessionStorage
  const setVerified = (verified) => {
    setIsVerified(verified);
  };
  
  // Não renderiza os componentes filhos até que a verificação inicial da sessão esteja completa
  if (isLoading) {
    return null; // Ou um componente de loading global
  }
  
  return (
    <CaptchaContext.Provider value={{isVerified, setIsVerified: setVerified}}>
      {children}
    </CaptchaContext.Provider>
  );
};
