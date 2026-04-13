import {useState, useEffect, useRef} from 'react';

export const useNavScrollspy = (elementIds) => {
  const [areaFocus, setAreaFocus] = useState(null);
  const elementsRef = useRef({});
  const areaFocusRef = useRef(null); // Ref para armazenar o foco atual e evitar re-renderizações

  // Efeito para encontrar os elementos no DOM de forma assíncrona
  useEffect(() => {
    const interval = setInterval(() => {
      const allFound = elementIds.every(id => {
        const el = document.querySelector(`#${id}`);
        if (el) {
          elementsRef.current[id] = el;
          return true;
        }
        return false;
      });
      // Limpa o intervalo assim que todos os elementos forem encontrados
      if (allFound) {
        clearInterval(interval);
      }
    }, 200); // Tenta a cada 200ms
    return () => clearInterval(interval);
  }, [elementIds]);

  // Efeito para adicionar e remover o listener de scroll
  useEffect(() => {
    const handleScroll = () => {
      const distances = Object.entries(elementsRef.current)
        .map(([key, value]) => (value ? {id: key, distance: value.getBoundingClientRect().y} : null))
        .filter(Boolean);

      if (distances.length === 0) return;

      distances.sort((a, b) => a.distance - b.distance);
      
      let moreProximity;
      if (distances.every(d => d.distance < 0)) {
        moreProximity = distances[distances.length - 1];
      } else {
        moreProximity = distances.find(d => d.distance > 0) || distances[0];
      }

      const newFocus = moreProximity ? moreProximity.id : null;

      // Apenas atualiza o estado se o foco realmente mudou
      if (areaFocusRef.current !== newFocus) {
        areaFocusRef.current = newFocus;
        setAreaFocus(newFocus);
      }
    };

    // Throttling para o evento de scroll para otimizar a performance
    let timeoutId = null;
    const throttledHandleScroll = () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 100); // Executa no máximo a cada 100ms
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);
    handleScroll(); // Executa uma vez no início

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [elementIds]);

  return areaFocus;
};
