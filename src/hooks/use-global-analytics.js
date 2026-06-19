import {useEffect, useState} from 'react';
import axios from 'axios';
import config from '@/assets/config.js';
import {useLocation} from 'react-router-dom';

export const useGlobalAnalytics = () => {
  const [publicIp, setPublicIp] = useState(null);
  const location = useLocation();

  useEffect(() => {
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
  }, [location, publicIp]);
};
