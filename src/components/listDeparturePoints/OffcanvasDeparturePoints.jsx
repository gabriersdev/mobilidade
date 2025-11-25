import {useContext} from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Util from "../../assets/Util.jsx";
import Alert from "../alert/Alert.jsx";
import {DPContext} from "./DeparturePointsContext.jsx";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const OffcanvasDeparturePoints = () => {
  const {show, pointDataOffcanvas, handleClose} = useContext(DPContext)
  
  return (
    <Offcanvas show={show} onHide={handleClose} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className={"fs-6 fw-light text-muted m-0 p-0"}>Ponto de parada</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className={"d-flex flex-column gap-3"}>
        <h3 className={"fs-3 m-0 p-0"}>
          {Util.renderText(pointDataOffcanvas.point_name ? `${pointDataOffcanvas.point_name} - ${pointDataOffcanvas.address}` : pointDataOffcanvas.address)}
        </h3>
        
        <section>
          <iframe
            width="100%"
            height="450"
            style={{border: 0}}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDLVLgUmpHx7VfSA0qTMhYdKW1SVXKFTak&q=${Util.convertToSafeText(pointDataOffcanvas.address)}cidade+sabara+minas+gerais`}>
          </iframe>
          <Alert variant={"warning"} className={"mt-2"}>
            <span className={"fw-light"}>
              A localização do Maps pode não corresponder <b className={"fw-bold"}>exatamente</b> ao endereço do ponto de parada. Use com cautela.
            </span>
          </Alert>
          <a className={"link-opacity-100 d-flex gap-1 align-items-center mt-1"} style={{textDecoration: 'none'}}
             href={`https://www.google.com/maps/search/?api=1&query=${Util.convertToSafeText(pointDataOffcanvas.address)}`}
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
        
        <p className={"text-muted fw-light"}>
          Este é o ponto de parada
          n.º {pointDataOffcanvas.point_ordenation + 1} de {pointDataOffcanvas.points_lenght} do sentido
        </p>
        
        <div className={"d-flex align-items-center gap-2 flex-wrap"}>
          <Button variant={"primary"} as={Link} to={"/guide?ei=" + (pointDataOffcanvas?.["departure_point_id"] ?? -1)} className={"d-flex align-items-center gap-2 flex-wrap"}>
            Linhas que param nesse ponto
            <i className="bi bi-shop-window"></i>
          </Button>
          
          <Button variant={"primary"} as={Link} to={"/live?ei=" + (pointDataOffcanvas?.["departure_point_id"] ?? -1)} className={"d-flex align-items-center gap-2 flex-wrap"}>
            Acompanhar aproximação de ônibus
            <i className="bi bi-shop-window"></i>
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default OffcanvasDeparturePoints;
