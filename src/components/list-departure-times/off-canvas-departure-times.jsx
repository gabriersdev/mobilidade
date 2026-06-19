import {useContext, useEffect, useState} from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

import {TimeContext} from "@/components/list-departure-times/departure-time-context.jsx";
import Legend from "@/components/ui/legend/legend.jsx";
import {Context as LineContext} from "@/components/line/line-context.jsx";
import OffCanvasDeparturePoint from "./off-canvas-departure-point.jsx";

const OffCanvasDepartureTimes = () => {
  const {show, handleClose, departureTimeOffCanvas} = useContext(TimeContext);
  const {firstPointByDirection} = useContext(LineContext)
  const [dataFirstPointByDirection, setDataFirstPointByDirection] = useState(null);
  
  useEffect(() => {
    const first = firstPointByDirection
    const direction = departureTimeOffCanvas.direction;
    
    if (first && direction) {
      const correspondence = firstPointByDirection[`${departureTimeOffCanvas.direction}`];
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (correspondence) setDataFirstPointByDirection(correspondence);
      else setDataFirstPointByDirection(null);
    } else setDataFirstPointByDirection(null);
  }, [firstPointByDirection, departureTimeOffCanvas.direction])
  
  return (
    <Offcanvas show={show} onHide={handleClose} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className={"fs-6 text-muted m-0 p-0"}>Horário de partida</Offcanvas.Title>
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
            <div className={'mt-4'}>
              <h4 className={"fs-6 fw-bold my-2 p-0"}>Observações:</h4>
              <Legend items={departureTimeOffCanvas.observations} type={"offcanvas"} marginTop={"mt-0"}/>
            </div>
            : ""
          }
        </section>
        
        <OffCanvasDeparturePoint dataFirstPointByDirection={dataFirstPointByDirection} />
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default OffCanvasDepartureTimes;
