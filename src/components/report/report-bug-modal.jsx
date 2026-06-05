import {useState} from 'react';
import {Modal} from 'react-bootstrap';

import ReportForm from "@/components/report/report-form.jsx";

const ReportBugModal = () => {
  const [showModal, setShowModal] = useState(false);
  
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  return (
    <>
      <div>
        <button
          className={"bg-transparent border-0 p-0 text-body"}
          onClick={handleShowModal}
        >
          <span className={"me-1 fw-normal"}>Informar um erro</span>
          <i className="bi bi-bug"></i>
        </button>
      </div>
      
      <Modal show={showModal} backdrop={"static"} keyboard={false} onHide={handleCloseModal}>
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

export default ReportBugModal;
