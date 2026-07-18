import {useEffect, useState} from "react";
import {Accordion, Button, DropdownButton, DropdownItem, ListGroup, Modal} from "react-bootstrap";
import Util from "@/lib/Util.jsx";

// TODO - separar partes deste componente em outros de acordo com a responsabilidade de tais partes. consulte @docs/CODING-GUIDELINES.md e @docs/ARCHITECTURE.md
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
        
        if (keys.length === 0) {
          const mockKeys = [
            "mobilidade-app-V43",
            "dynamic-mobilidade-app-V43",
            "imagens-em-cache-v1",
            "api-responses-v2",
            "offline-pages-v1"
          ];
          setCachesList(mockKeys);
          
          data["mobilidade-app-V43"] = [
            window.location.origin + "/index.html",
            window.location.origin + "/css/app.css",
            window.location.origin + "/css/bootstrap-cerulean.css"
          ];
          data["dynamic-mobilidade-app-V43"] = [
            window.location.origin + "/assets/logo.png",
            window.location.origin + "/assets/icon.png"
          ];
          data["imagens-em-cache-v1"] = [
            window.location.origin + "/img/photo1.jpg",
            window.location.origin + "/img/photo2.jpg",
            window.location.origin + "/img/photo3.jpg",
            window.location.origin + "/img/photo4.jpg",
            window.location.origin + "/img/photo5.jpg"
          ];
          data["api-responses-v2"] = [
            "https://api.mobilidade.com.br/linhas",
            "https://api.mobilidade.com.br/horarios"
          ];
          data["offline-pages-v1"] = [
            window.location.origin + "/offline.html"
          ];
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
      
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className={"fw-semibold"} style={{fontSize: "1.35rem"}}>Gerenciar Cache</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted text-sml">
            Gerencie os arquivos armazenados em cache pela aplicação. Você pode apagar arquivos de bundle e páginas salvas, ou mantê-los para acesso offline mais rápido.
          </p>
          {cachesList.length === 0 ? (
            <div className="alert alert-info py-2">Nenhum cache armazenado no momento.</div>
          ) : (
            <Accordion>
              {cachesList.map((cacheName, index) => (
                <Accordion.Item eventKey={index.toString()} key={cacheName}>
                  <Accordion.Header>
                    <span className="text-truncate fw-semibold me-2" title={cacheName} style={{maxWidth: '220px'}}>{cacheName}</span>
                    <span className={"text-sml"}>- {cachesData[cacheName]?.length || 0} arquivos</span>
                  </Accordion.Header>
                  <Accordion.Body className="p-0">
                    <div className="p-2 border-bottom bg-light d-flex justify-content-between align-items-center gap-1 flex-wrap">
                      <span className="text-muted text-sml">Ações para este cache:</span>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteCache(cacheName)} className={"text-sml"}>
                        Apagar todos os itens
                      </Button>
                    </div>
                    {/*TODO implementar componente PaginationWithItems aqui*/}
                    <ListGroup variant="flush" style={{maxHeight: '300px', overflowY: 'auto'}}>
                      {cachesData[cacheName] && cachesData[cacheName].length > 0 ? (
                        cachesData[cacheName].map(url => {
                          const displayUrl = url.startsWith(window.location.origin)
                            ? url.replace(window.location.origin, '')
                            : url;
                          return (
                            // TODO implementar componente PaginationWithItems aqui
                            <ListGroup.Item key={url} className="d-flex justify-content-between align-items-center p-2">
                              <span className="text-truncate text-sml text-muted me-2" title={displayUrl} style={{maxWidth: '350px'}}>
                                {displayUrl}
                              </span>
                              <Button variant="danger" size="sm" onClick={() => handleDeleteCacheFile(cacheName, url)} title="Apagar arquivo">
                                <i className="bi bi-x"></i>
                              </Button>
                            </ListGroup.Item>
                          );
                        })
                      ) : (
                        <div className="p-3 text-muted small text-center">Nenhum arquivo encontrado.</div>
                      )}
                    </ListGroup>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => {
            if (cachesList.length > 0) handleClearAll().then()
          }} className={"rounded-1 " + (cachesList.length === 0 ? "cursor-not-allowed opacity-50" : "")}>
            Apagar tudo
          </Button>
          <Button variant="secondary" onClick={handleClose} className={"rounded-1"}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
