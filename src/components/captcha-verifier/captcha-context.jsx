import {createContext, useCallback, useEffect, useState} from 'react';
import apiClient from '@/assets/axios-config.js';

// TODO - separar Context para um arquivo separado para melhorar refresh
export const CaptchaContext = createContext();

export const CaptchaProvider = ({children}) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSessionStatus = async () => {
      try {
        // Usa o apiClient, que já tem a baseURL e withCredentials configurados
        const response = await apiClient.get('/check-auth');
        if (response.data.isVerified) {
          setIsVerified(true);
        }
      } catch (error) {
        // O erro 401 é esperado se não houver sessão, e o interceptor não vai redirecionar.
        // Apenas logamos outros erros inesperados.
        if (error.response?.status !== 401) {
          console.error("Erro ao verificar a sessão:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkSessionStatus();
  }, []);

  const verifyToken = useCallback(async (token) => {
    if (!token) {
      return {success: false, message: 'Token não fornecido.'};
    }
    
    try {
      const response = await apiClient.post('/verify-session', {hcaptchaToken: token});
      if (response.data.success) {
        setIsVerified(true);
        return {success: true, message: 'Sessão verificada com sucesso!'};
      } else {
        setIsVerified(false);
        return {success: false, message: response.data.message ?? "Erro não mapeado"};
      }
    } catch (error) {
      console.error("Erro ao verificar o token:", error);
      setIsVerified(false);
      return {success: false, message: 'Erro de comunicação com o servidor.'};
    }
  }, []);

  const resetVerification = useCallback(() => {
    setIsVerified(false);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <CaptchaContext.Provider value={{isVerified, verifyToken, resetVerification}}>
      {children}
    </CaptchaContext.Provider>
  );
};
