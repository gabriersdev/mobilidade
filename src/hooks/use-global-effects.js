import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import config from '@/assets/config.js';
import Util from '@/assets/Util.jsx';

export const useGlobalEffects = () => {
  const [publicIp, setPublicIp] = useState(null);
  const location = useLocation();
  
  // Efeito para registrar Service Worker e buscar IP público
  useEffect(() => {
    if ("serviceWorker" in navigator && window.location.hostname !== "localhost") {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("Service Worker registrado com sucesso!"))
        .catch((err) => console.error("Erro ao registrar o Service Worker:", err));
    }
    
    if (window.location.hostname !== "localhost") {
      fetch("https://api64.ipify.org?format=json")
        .then(response => response.json())
        .then(data => setPublicIp(data?.ip ?? -1))
        .catch(error => {
          setPublicIp(1);
          console.log("Erro ao obter IP:", error);
        });
    }
  }, []);
  
  // Efeito para inicializar AOS e definir rel em links
  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
    });
    document.querySelectorAll('a').forEach(link => link.setAttribute('rel', 'noopener noreferrer'));
  }, []);
  
  // Efeito para adicionar versão ao script principal
  useEffect(() => {
    let attempts = 0;
    const addVersionToScript = () => {
      if (attempts >= 5) return;
      const script = Array.from(document.querySelectorAll("script")).find(s => s.type === "module" && s.src.match(/\/assets\/index\.\w*\.js/));
      if (script) {
        script.src = script.src + "?v=" + new Date().getTime();
      } else {
        attempts++;
        setTimeout(addVersionToScript, 1000 * attempts);
      }
    };
    addVersionToScript();
  }, []);
  
  // Efeito para esconder o loader inicial
  useEffect(() => {
    const loader = document.querySelector('.overlay-mobi');
    if (loader) {
      setTimeout(() => {
        loader.style.display = 'none';
      }, 1000);
    }
  }, []);
  
  // Efeito para logging e rolagem da página
  useEffect(() => {
    if (publicIp && window.location.hostname !== "localhost") {
      axios.post(`${config.host}/api/logs/`, {
        event_type: 'Access page',
        event_details: `Access URL: ${window.location.href}`,
        os: navigator.userAgent,
        browser: navigator.userAgent,
        ip_address: publicIp,
        user_agent: navigator.userAgent,
        page: window.location.pathname,
        line_id_access: window.location.pathname.includes("lines/") ? window.location.pathname.split('/').pop() : null,
        referrer: document.referrer || "",
      }).catch(error => {
        console.log(`Ocorreu um erro ao registrar log.`, error);
      });
    }
    
    if (location.hash && !location.pathname.match(/lines\/\d+\/#\w+/)) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({top: element.offsetTop, behavior: 'smooth'});
      }
    } else if (!location.pathname.match(/lines\/\d+\/#\w+/)) {
      setTimeout(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
      }, 100);
    }
  }, [location, publicIp]);
  
  // Efeito para limpeza de cache do Service Worker
  useEffect(() => {
    Util.clearServiceWorker();
  }, []);
};
