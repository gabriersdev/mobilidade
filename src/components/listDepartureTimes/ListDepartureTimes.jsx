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
    const uniqueDaysForDirection = uniqueDirections.map((direction) => departureTimes.filter((item) => item.direction === direction).map((item) => item.day).filter((value, index, self) => self.indexOf(value) === index))

    return (
      <DepartureTimeContext>
        {/* Accordion principal, que permite acesso aos horários das direções disponíveis */}
        <Accordion defaultEventKey={['0']}>
          <OffcanvasDepartureTimes/>
          {uniqueDirections.map((direction, i) => {
            const directionName = direction === 1 ? `Sentido ida - ${departure_location} -> ${destination_location}` : `Sentido volta - ${destination_location} -> ${departure_location}`
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
                </ThemeContext>
              </AccordionItem>
            )
          })}
        </Accordion>
      </DepartureTimeContext>
    )
  }
}

ListDepartureTimes.propTypes = {
  line_id: PropTypes.number.isRequired,
  departure_location: PropTypes.string.isRequired,
  destination_location: PropTypes.string.isRequired
}

export {ListDepartureTimes}
