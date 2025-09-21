import OffcanvasDepartureTimes from "./OffcanvasDepartureTimes.jsx";
import AccordionItem from "../accordion/AccordionItem.jsx";
import {ThemeContext} from "../themeContext/ThemeContext.jsx";
import AccordionOperationDays from "./AccordionOperationDays.jsx";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Accordion from "../accordion/Accordion.jsx";
import PropTypes from "prop-types";

export default function Intermediate({data = [], observations, departure_location, destination_location, sortedDays, type}) {
  // Se tudo correu bem, renderiza o conteúdo final
  const departureTimes = data.toSorted((a, b) => a.day - b.day);
  const uniqueDirections = departureTimes.map((item) => item.direction).filter((value, index, self) => self.indexOf(value) === index);
  
  return (
    <Accordion defaultEventKey={["0"]} id={"departure-times-data"}>
      <OffcanvasDepartureTimes/>
      {uniqueDirections.map((direction, i) => {
        const directionName =
          direction === 1 ? (`Sentido ida - ${departure_location} -> ${destination_location}`) :
            direction === 0 ? (`Sentido único - ${departure_location} <-> ${destination_location} (ida e volta)`) :
              direction === 2 ? (`Sentido volta - ${destination_location} -> ${departure_location}`) : "";
        return (
          <AccordionItem
            title={directionName}
            eventKey={i.toString()} key={i}>
            <ThemeContext value={{
              departureTimes,
              // 7. Usa o estado 'sortedDays' com os dados corretos e ordenados
              uniqueDaysForDirection: sortedDays,
              index: i,
              direction,
              directionName,
              observations,
              type: type
            }}>
              <AccordionOperationDays/>
              <div className={"d-flex gap-2 flex-wrap align-items-center mt-4"}>
                <OverlayTrigger overlay={<Tooltip>Não houve alteração no quadro de horários</Tooltip>}>
                  <span><i className="bi bi-dash-circle-fill text-primary"></i></span>
                </OverlayTrigger>
                <span className={"d-inline-block text-muted"}> {departureTimes.length.toLocaleString()} horários de partidas neste sentido.</span>
              </div>
            </ThemeContext>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

Intermediate.propTypes = {
  data: PropTypes.array.isRequired,
  observations: PropTypes.any.isRequired,
  departure_location: PropTypes.string.isRequired,
  destination_location: PropTypes.string.isRequired,
  sortedDays: PropTypes.any.isRequired,
  type: PropTypes.oneOf(["history", "current"]),
}
