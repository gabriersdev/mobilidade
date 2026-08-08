import {useState, useRef, useEffect} from "react";

export const useLiveConfigs = () => {
  const [configs, setConfigs] = useState(() => {
    const defaultConfig = {
      warningSound: true,
      showSomeDepartureStart: false,
      showAdditionalInfo: true,
      showSingleLine: false,
    };
    try {
      const savedConfigs = localStorage.getItem("mobilidade-app-live-configs");
      if (savedConfigs) {
        return {...defaultConfig, ...JSON.parse(savedConfigs)};
      }
    } catch (error) {
      console.error("Error reading configs from localStorage", error);
    }
    return defaultConfig;
  });
  
  // TODO - revisar configuração de aviso sonoro: carregar ele antes de ser necessário tocá-lo (para deixar ele já pre-carregado e tocar mais facilmente) e verificar se ele está sendo tocado quando a configuração determina (parece que não está sendo tocado em nenhuma ocasião). Corrigir se for o caso.
  const labelsConfigs = useRef({
    warningSound: "Aviso sonoro",
    showSomeDepartureStart: "Exibir apenas partidas",
    showAdditionalInfo: "Exibir informações extras",
    showSingleLine: "Exibir em linha única"
  });
  
  useEffect(() => {
    try {
      localStorage.setItem("mobilidade-app-live-configs", JSON.stringify(configs));
    } catch (error) {
      console.error("Error saving configs to localStorage", error);
    }
  }, [configs]);
  
  return {configs, setConfigs, labelsConfigs};
};
