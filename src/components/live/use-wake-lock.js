import { useEffect } from "react";

export const useWakeLock = () => {
  useEffect(() => {
    if ('wakeLock' in navigator) {
      let wakeLock = null;
      
      async function requestWakeLock() {
        try {
          wakeLock = await navigator.wakeLock.request('screen');
          wakeLock.addEventListener('release', () => {
            console.log('[INFO] - Wake Lock foi liberado');
          });
          console.log('[INFO] - Wake Lock ativado');
        } catch (err) {
          console.error('[FAIL] - Falha ao ativar o Wake Lock:', err);
        }
      }
      
      requestWakeLock().then();
    } else {
      console.log('[INFO] - API de Wake Lock não suportada neste navegador');
    }
  }, []);
};
