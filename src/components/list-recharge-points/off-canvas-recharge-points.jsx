import {useContext} from "react";
import {RechargeContext} from "./recharge-points-context.jsx";
import Offcanvas from "react-bootstrap/Offcanvas";
import Util from "../../assets/Util.jsx";

const OffCanvasRechargePoints = () => {
  const {show, handleClose, rechargePointOffCanvas} = useContext(RechargeContext);
  
  return (
    <Offcanvas show={show} onHide={handleClose} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className={"fs-6 fw-light text-muted m-0 p-0"}>Ponto de recarga</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className={"d-flex flex-column gap-3"}>
        <h3 className={"fs-3 m-0 p-0"}>
          {rechargePointOffCanvas.point_name}
        </h3>
        <section>
          <div className={"d-flex flex-column gap-2 mb-3"}>
            <p className={"m-0 p-0 text-balance"}>{rechargePointOffCanvas.address}</p>
            <p className={"m-0 p-0 text-balance"}>{rechargePointOffCanvas.observations || "Não há observações sobre este ponto de recarga."}</p>
          </div>
          <iframe
            width="100%"
            height="450"
            style={{border: 0}}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDLVLgUmpHx7VfSA0qTMhYdKW1SVXKFTak&q=${Util.convertToSafeText(rechargePointOffCanvas.address)}`}>
          </iframe>
          <a className={"link-opacity-100 d-flex gap-1 align-items-center mt-2"} style={{textDecoration: 'none'}}
             href={rechargePointOffCanvas.link}
             rel={"noreferrer noopener"} target={"_blank"}
          >
            <span>Abrir no Maps</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px"
                 fill={"#7BBEFE"}>
              <path
                d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
            </svg>
          </a>
        </section>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default OffCanvasRechargePoints;
