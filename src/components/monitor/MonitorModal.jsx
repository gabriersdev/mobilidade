import {useState} from 'react';
import {
  Badge,
  Modal
} from 'react-bootstrap';

import MonitorForm from "./MonitorForm.jsx";

const MonitorModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  const clientNotificate = async () => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      alert("Navegador não suporta notificações ou service worker");
      return;
    }
    
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("Permissão de notificação negada");
      return;
    }
    
    const registration = await navigator.serviceWorker.ready;
    
    registration.showNotification("Aviso do app", {
      body: "Essa notificação foi enviada via Service Worker direto.",
      icon: "/images/icon-white-192x192.png",
      badge: "/images/icon-white-192x192.png",
      tag: "notificacao-teste",
      renotify: true,
    });
  };
  
  return (
    <>
      <div>
        <Badge className={"fw-normal rounded-5 bg-primary-subtle p-0"}>
          <button
            className={"btn m-0 border-0 px-2 py-1 d-inline-block text-body text-decoration-none d-flex gap-2"}
            style={{lineHeight: "normal"}}
            onClick={() => (async () => {
              handleShowModal()
              await clientNotificate()
            })()}
          >
            <span>Acompanhar</span>
            <i className="bi bi-bell"></i>
          </button>
        </Badge>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className={"border-0"}>
            <Modal.Title className={"fw-semibold"} style={{fontSize: "1.35rem"}}>Receber informações da linha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MonitorForm handleCloseModal={handleCloseModal}/>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MonitorModal;
