import {useContext} from "react";

import Offcanvas from "react-bootstrap/Offcanvas";
import {TimeContext} from "./DepartureTimeContext.jsx";
import Legend from "../legend/Legend.jsx";

const OffcanvasDepartureTimes = () => {
  const {show, handleClose, departureTimeOffCanvas} = useContext(TimeContext);

  return (
    <Offcanvas show={show} onHide={handleClose} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className={"fs-6 fw-light text-muted m-0 p-0"}>Horário de partida</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className={"d-flex flex-column gap-3"}>
        <section>
          <span className={'text-muted d-block mb-3'}>{departureTimeOffCanvas.dayName}</span>
          <h3 className={"fs-3 m-0 p-0"}>
            {departureTimeOffCanvas.time}
          </h3>
        </section>

        <section>
          <span className={'text-muted d-block'}>{departureTimeOffCanvas.directionName}</span>
          {departureTimeOffCanvas.observations ?
            <div className={'mt-3'}>
              <h4 className={"fs-6 fw-bold my-2 p-0"}>Observações:</h4>
              <Legend items={departureTimeOffCanvas.observations} marginTop={"mt-0"}/>
            </div>
            : ""
          }
        </section>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default OffcanvasDepartureTimes;
