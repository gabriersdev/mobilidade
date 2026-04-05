import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from "prop-types";

const GenericModal = ({ show, onHide, title, body, footer }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        {footer || <Button variant="secondary" onClick={onHide}>Fechar</Button>}
      </Modal.Footer>
    </Modal>
  );
};

GenericModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  footer: PropTypes.element,
};

export default GenericModal;
