import {createContext, useEffect, useState} from 'react';
import Config from "@/assets/config.js";

// TODO - separar Context para um arquivo separado para melhorar refresh
export const CaptchaContext = createContext();

// Responsável por PERMITIR que o usuário interaja com a aplicação, para evitar acessos automatizados de BOTS
// TODO - precisa REGISTRAR no navegador uma sessão com a aprovação do TOKEN ou bolar uma forma de que, ao abrir outra página da aplicação ou
// ao atualizar a página, não seja solicitado imediatamente que o captcha seja feito.
// O terreno já está preparado para integração com JWT com a API. Precisa finalizar a implementação
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
    
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkSessionStatus().then();
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
