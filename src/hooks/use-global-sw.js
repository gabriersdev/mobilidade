import {useEffect} from 'react';
import Util from '@/lib/Util.jsx';

export const useGlobalSw = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator && window.location.hostname !== "localhost") {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("Service Worker registrado com sucesso!"))
        .catch((err) => console.error("Erro ao registrar o Service Worker:", err));
    }
  }, []);

  useEffect(() => {
    Util.clearServiceWorker();
  }, []);
};
