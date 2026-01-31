import OffCanvasDepartureTimes from "./off-canvas-departure-times.jsx";
import AccordionItem from "../ui/accordion/accordion-item.jsx";
import {ThemeContext} from "../ui/theme-context/theme-context.jsx";
import AccordionOperationDays from "./accordion-operation-days.jsx";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Accordion from "../ui/accordion/accordion.jsx";
import PropTypes from "prop-types";

export default function Intermediate({data = [], observations, departure_location, destination_location, sortedDays, type, scope}) {
  // Se tudo correu bem, renderiza o conteúdo final
  const departureTimes = data.toSorted((a, b) => a.day - b.day);
  const uniqueDirections = departureTimes.map((item) => item.direction).filter((value, index, self) => self.indexOf(value) === index);
  
  if (!departure_location || !uniqueDirections) return <div>Organizando horários...</div>;
  
  return (
    <Accordion defaultEventKey={["0"]} id={"departure-times-data"}>
      <OffCanvasDepartureTimes/>
      {[...(uniqueDirections[0] === 2 ? uniqueDirections.toReversed() : uniqueDirections)].map((direction, i) => {
        const directionName =
          direction === 1 ? (`Sentido ida - ${departure_location} ⇄ ${destination_location}`) :
            direction === 0 ? (`Sentido único - ${departure_location} ⇄ ${destination_location} (ida e volta)`) :
              direction === 2 ? (`Sentido volta - ${destination_location} ⇄ ${departure_location}`) : "";
        return (
          <AccordionItem
            title={directionName}
            eventKey={i.toString()} key={i}>
            <ThemeContext.Provider value={{
              departureTimes,
              // 7. Usa o estado 'sortedDays' com os dados corretos e ordenados
              uniqueDaysForDirection: sortedDays,
              index: i,
              direction,
              directionName,
              observations,
              type: type,
              scope: scope
            }}>
              <AccordionOperationDays/>
              <div className={"d-flex gap-2 align-items-center mt-4"}>
                <OverlayTrigger overlay={<Tooltip>Não houve alteração no quadro de horários</Tooltip>}>
                  <span><i className="bi bi-dash-circle-fill text-primary"></i></span>
                </OverlayTrigger>
                <span className={"text-body-secondary line-clamp-1 text-sml"}>{departureTimes.length.toLocaleString()} horários de partidas neste sentido.</span>
              </div>
            </ThemeContext.Provider>
          </AccordionItem>
        )
      })}
      <div className={"mt-2"}>
        <p className={"d-block text-body-tertiary text-sml m-0 p-0 text-balance"}>Os horários são atualizados periodicamente via integração com a companhia.</p>
      </div>
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
  scope: PropTypes.any
}
