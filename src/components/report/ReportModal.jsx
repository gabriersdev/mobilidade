import {useState} from 'react';
import {
  Badge,
  Modal
} from 'react-bootstrap';

import ReportForm from "./ReportForm.jsx";

const ReportModal = () => {
  const [showModal, setShowModal] = useState(false);

  // const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div>
        <Badge className={"fw-normal rounded-5 bg-info p-0 m-0"}>
          <button className={"btn m-0 px-2 pv-15 d-inline-block text-black text-decoration-none border-0 outline-none"} onClick={() => {window.open("mailto:devgabrielribeiro@gmail.com")}} style={{lineHeight: "1"}}>
            <span className={"me-1"}>Informar um erro</span>
            <i className="bi bi-bug"></i>
          </button>
        </Badge>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className={"border-0"}>
          <Modal.Title className={"fw-semibold"} style={{fontSize: "1.35rem"}}>Informar um erro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReportForm handleCloseModal={handleCloseModal}/>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ReportModal;
