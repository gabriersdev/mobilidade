import {useEffect, useState} from "react";
import {DropdownButton, DropdownItem} from "react-bootstrap";
import Util from "@/lib/Util.jsx";
import CacheManagerModal from "./cache-manager-modal.jsx";

export default function CacheControl() {
  const [show, setShow] = useState(false);
  const [cachesList, setCachesList] = useState([]);
  const [cachesData, setCachesData] = useState({});
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const fetchCaches = async () => {
    if ('caches' in window) {
      try {
        const keys = await caches.keys();
        setCachesList(keys);
        
        const data = {};
        for (const key of keys) {
          const cache = await caches.open(key);
          const requests = await cache.keys();
          data[key] = requests.map(req => req.url);
        }
        
        setCachesData(data);
      } catch (err) {
        console.error("Erro ao buscar caches", err);
      }
    }
  };
  
  useEffect(() => {
    if (show) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchCaches().then();
    }
  }, [show]);
  
  const handleDeleteCache = async (cacheName) => {
    if ('caches' in window) {
      try {
        await caches.delete(cacheName);
        await fetchCaches();
      } catch (err) {
        console.error("Erro ao deletar cache", err);
      }
    }
  };
  
  const handleDeleteCacheFile = async (cacheName, url) => {
    if ('caches' in window) {
      try {
        const cache = await caches.open(cacheName);
        await cache.delete(url);
        await fetchCaches();
      } catch (err) {
        console.error("Erro ao deletar arquivo do cache", err);
      }
    }
  };
  
  const handleClearAll = async () => {
    if ('caches' in window) {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map(key => caches.delete(key)));
        await fetchCaches();
      } catch (err) {
        console.error("Erro ao deletar todos os caches", err);
      }
    }
  };
  
  return (
    <>
      <DropdownButton
        id="dropdown-cache-button"
        title="Controlar cache"
        variant="secondary"
        className="mt-1"
      >
        <DropdownItem onClick={() => {
          Util.clearServiceWorker();
          window.location.reload();
        }}>
          Limpar cache geral
        </DropdownItem>
        <DropdownItem onClick={() => {
          if (localStorage) localStorage.clear();
          window.location.reload();
        }}>
          Limpar outros dados
        </DropdownItem>
        <DropdownItem onClick={handleShow}>
          Gerenciar arquivos de cache...
        </DropdownItem>
      </DropdownButton>
      
      <CacheManagerModal
        show={show}
        handleClose={handleClose}
        cachesList={cachesList}
        cachesData={cachesData}
        handleDeleteCache={handleDeleteCache}
        handleDeleteCacheFile={handleDeleteCacheFile}
        handleClearAll={handleClearAll}
      />
    </>
  );
}
