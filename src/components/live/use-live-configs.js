import { useState, useRef, useEffect } from "react";

export const useLiveConfigs = () => {
  const [configs, setConfigs] = useState(() => {
    const defaultConfig = {
      warningSound: true,
      showSomeDepartureStart: false,
      showAdditionalInfo: true,
      showSingleLine: false,
    };
    try {
      const savedConfigs = localStorage.getItem("live-configs");
      if (savedConfigs) {
        return {...defaultConfig, ...JSON.parse(savedConfigs)};
      }
    } catch (error) {
      console.error("Error reading configs from localStorage", error);
    }
    return defaultConfig;
  });

  const labelsConfigs = useRef({
    warningSound: "Aviso sonoro",
    showSomeDepartureStart: "Exibir apenas partidas",
    showAdditionalInfo: "Exibir informações extras",
    showSingleLine: "Exibir em linha única"
  });

  useEffect(() => {
    try {
      localStorage.setItem("live-configs", JSON.stringify(configs));
    } catch (error) {
      console.error("Error saving configs to localStorage", error);
    }
  }, [configs]);

  return { configs, setConfigs, labelsConfigs };
};
