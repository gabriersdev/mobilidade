import {Accordion, Button, Modal} from 'react-bootstrap';
import CacheAccordionItem from "./cache-accordion-item.jsx";
import PropTypes from "prop-types";

const CacheManagerModal = ({
  show,
  handleClose,
  cachesList,
  cachesData,
  handleDeleteCache,
  handleDeleteCacheFile,
  handleClearAll
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
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
              <CacheAccordionItem
                key={index}
                cacheName={cacheName}
                index={index}
                cachesData={cachesData}
                handleDeleteCache={handleDeleteCache}
                handleDeleteCacheFile={handleDeleteCacheFile}
              />
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
  );
};

CacheManagerModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  cachesList: PropTypes.array.isRequired,
  cachesData: PropTypes.object.isRequired,
  handleDeleteCache: PropTypes.func.isRequired,
  handleDeleteCacheFile: PropTypes.func.isRequired,
  handleClearAll: PropTypes.func.isRequired,
};

export default CacheManagerModal;
