import {useState, useRef, useEffect} from "react";

export const useLiveConfigs = () => {
  const [configs, setConfigs] = useState(() => {
    const defaultConfig = {
      // TODO - implementar agrupamento de informações de partida: SE a linha FOR A MESMA, agrupar em uma única linha as informações e incidência de partida
      groupInfos: false,
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
  
  
  const labelsConfigs = useRef({
    groupInfos: "Agrupar informações de partida",
    warningSound: "Aviso sonoro",
    showSomeDepartureStart: "Exibir apenas partidas",
    showAdditionalInfo: "Exibir informações extras",
    showSingleLine: "Exibir em linha única",
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
