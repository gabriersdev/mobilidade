import PropTypes from "prop-types";
import useDepartureTimes from "./UseDepartureTimes.js";
import Alert from "../alert/Alert";
import Accordion from "../accordion/Accordion";
import AccordionItem from "../accordion/AccordionItem";
import FeedbackError from "../feedbackError/FeedbackError";
import {DepartureTimeContext} from "./DepartureTimeContext";
import OffcanvasDepartureTimes from "./OffcanvasDepartureTimes";
import {ThemeContext} from "../themeContext/ThemeContext";
import AccordionOperationDays from "./AccordionOperationDays";
import Util from "../../assets/Util.jsx";
import {AnimatePresence} from "framer-motion";
import AnimatedComponent from "../animatedComponent/AnimatedComponent.jsx";

const ListDepartureTimes = ({line_id, departure_location, destination_location}) => {
  const {data, observations, error, isLoaded} = useDepartureTimes(line_id);

  if (isLoaded) {
    return <div>Carregando...</div>;
  } else if (error) {
    console.log(error)
    return <FeedbackError code={error.response.status || 500} text={error.message} type={'card'}/>;
  } else if (data.length === 0) {
    return <Alert variant={'info'}><span>Não localizamos horários para esta linha.</span></Alert>
  } else {
    // Ordena os horários de partida por dia e horário
    const departureTimes = data.toSorted((a, b) => a.day - b.day)
    const uniqueDirections = departureTimes.map((item) => item.direction).filter((value, index, self) => self.indexOf(value) === index)
    let uniqueDaysForDirection = uniqueDirections.map((direction) => departureTimes.filter((item) => item.direction === direction).map((item) => item.day).filter((value, index, self) => self.indexOf(value) === index))

    // Ordenando os dias converte o nome deles convertidos, depois alterando a variavel uniqueDaysForDirection com os itens ordenados pelos nomes
    uniqueDaysForDirection = uniqueDaysForDirection.map(directionItems => {
      return [
        ...directionItems.map(i => [i, Util.convertNumberToDay(i)])
          .sort((a, b) => a[1].localeCompare(b[1]))
          .map(is => is[0])
      ]
    })
    
    return (
      <AnimatePresence mode={"wait"}>
        <AnimatedComponent>
          <DepartureTimeContext>
            {/* Accordion principal, que permite acesso aos horários das direções disponíveis */}
            <Accordion defaultEventKey={['0']}>
              <OffcanvasDepartureTimes/>
              {uniqueDirections.map((direction, i) => {
                const directionName =
                  direction === 1 ? (`Sentido ida - ${departure_location} -> ${destination_location}`) :
                    direction === 0 ? (`Sentido único - ${departure_location} <-> ${destination_location} (ida e volta)`) :
                      direction === 2 ? (`Sentido volta - ${destination_location} -> ${departure_location}`) : ""
                return (
                  <AccordionItem
                    title={directionName}
                    eventKey={i.toString()} key={i}>
                    {/* Accordion secundário, de dias */}
                    <ThemeContext value={Object.assign({}, {
                      departureTimes,
                      uniqueDaysForDirection,
                      index: i,
                      direction,
                      directionName,
                      observations
                    })}>
                      <AccordionOperationDays/>
                      <span className={"d-inline-block text-muted mt-4"}>{departureTimes.length.toLocaleString()} horários de partidas neste sentido.</span>
                    </ThemeContext>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </DepartureTimeContext>
        </AnimatedComponent>
      </AnimatePresence>
    )
  }
}

ListDepartureTimes.propTypes = {
  line_id: PropTypes.number.isRequired,
  departure_location: PropTypes.string.isRequired,
  destination_location: PropTypes.string.isRequired
}

export {ListDepartureTimes}
