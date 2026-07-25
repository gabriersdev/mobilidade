import {Button, ListGroup, Modal} from 'react-bootstrap';
import PropTypes from "prop-types";

const StorageManagerModal = ({
  show,
  handleClose,
  storageList,
  handleDeleteStorage,
  handleClearAllStorage
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className={"fw-semibold"} style={{fontSize: "1.35rem"}}>Gerenciar Dados e Configurações</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted text-sml">
          Gerencie os dados de pesquisas recentes e configurações armazenadas no seu navegador.
        </p>
        {storageList.length === 0 ? (
          <div className="alert alert-info py-2">Nenhum dado armazenado no momento.</div>
        ) : (
          <ListGroup>
            {storageList.map((key) => (
              <ListGroup.Item key={key} className="d-flex justify-content-between align-items-center p-2 text-ellipsis">
                <div className="d-flex flex-column">
                  <span className="text-truncate fw-semibold text-sml" title={key} style={{maxWidth: '350px'}}>
                    {key.replace('mobilidade-app-', '')}
                  </span>
                  <span className="text-muted" style={{fontSize: '0.75rem'}}>
                    {key}
                  </span>
                </div>
                <Button variant="danger" size="sm" onClick={() => handleDeleteStorage(key)} title="Apagar dado">
                  <i className="bi bi-x"></i>
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => {
          if (storageList.length > 0) handleClearAllStorage();
        }} className={"rounded-1 " + (storageList.length === 0 ? "cursor-not-allowed opacity-50" : "")}>
          Apagar tudo
        </Button>
        <Button variant="secondary" onClick={handleClose} className={"rounded-1"}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

StorageManagerModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  storageList: PropTypes.array.isRequired,
  handleDeleteStorage: PropTypes.func.isRequired,
  handleClearAllStorage: PropTypes.func.isRequired,
};

export default StorageManagerModal;
