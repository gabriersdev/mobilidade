import PropTypes from "prop-types";
import {Badge} from "react-bootstrap";
import Alert from "@/components/ui/alert/alert.jsx";
import LiveBanner from "@/components/banners/live-banner.jsx";

const OffCanvasDeparturePoint = ({ dataFirstPointByDirection }) => {
  if (!dataFirstPointByDirection) return null;

  return (
    <section>
      <div className={"mt-3"}>
        <h4 className={"fs-6 fw-bold my-2 p-0"}>De onde saí o ônibus?</h4>
        
        <div className={"mb-2 mt-3 d-flex align-items-center gap-1"}>
          <Badge className={"rounded-pill"}><i className="bi bi-geo-alt-fill small"></i></Badge>
          <p className={"mb-0"}>{dataFirstPointByDirection.address || ""}</p>
        </div>
        
        <div>
          <iframe
            width="100%"
            height="450"
            style={{border: 0}}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDLVLgUmpHx7VfSA0qTMhYdKW1SVXKFTak&q=${(dataFirstPointByDirection.point_name || "") + " " + (dataFirstPointByDirection.address || "")}cidade+sabara+minas+gerais`}>
          </iframe>
          <Alert variant={"warning"} className={"mt-2"}>
            <span>A localização do Maps pode não corresponder <b className={"fw-bold"}>exatamente</b> ao endereço do ponto de parada. Use com cautela.</span>
          </Alert>
          <a className={"link-opacity-100 d-flex gap-1 align-items-center mt-1"} style={{textDecoration: 'none'}}
             href={`https://www.google.com/maps/search/?api=1&query=${(dataFirstPointByDirection.point_name || "") + " " + (dataFirstPointByDirection.address || "")}`}
             rel={"noreferrer noopener"} target={"_blank"}
          >
            <span>Abrir no Maps</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill={"#7BBEFE"}>
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
            </svg>
          </a>
        </div>
      </div>
      <div className={"mt-3"}>
        <LiveBanner/>
      </div>
    </section>
  );
};

OffCanvasDeparturePoint.propTypes = {
  dataFirstPointByDirection: PropTypes.object
};

export default OffCanvasDeparturePoint;
