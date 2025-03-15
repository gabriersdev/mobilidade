import {useContext} from "react";
import Util from "../../assets/Util";
import AccordionItem from "../accordion/AccordionItem";
import Table from "./TableDepartureTimes";
import Legend from "../legend/Legend";
import Accordion from "../accordion/Accordion";
import {Theme} from "../themeContext/ThemeContext";
import Alert from "../alert/Alert.jsx";

const AccordionOperationDays = () => {
  const {departureTimes, uniqueDaysForDirection, index, direction, directionName, observations} = useContext(Theme)
  let defaultEventKey = ['0']

  const currDayName = () => {
    switch (new Date().getDay()) {
      case 0:
        return 'domingos';
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return 'dias úteis';
      case 6:
        return 'sábados';
    }
  }

  const content = uniqueDaysForDirection[index].map((day, j) => {
    const departureTimesDay = departureTimes.filter((item) => item.day === day && item.direction === direction);
    const dayConverted = Util.convertNumberToDay(day);
    if (dayConverted.toLowerCase().includes(currDayName().toLowerCase())) defaultEventKey = [j.toString()];
    return (
      <AccordionItem title={dayConverted} eventKey={j.toString()} key={j}>
        <Table
          content={{
            data: departureTimesDay.map((item) => {
              return {
                departureTime: Util.formatTime(`2020-01-01 ${item.departure_time}`, 'HH:mm'),
                observations: item.observations ? item.observations : null
              }
            }),
            directionName: directionName,
            dayName: dayConverted
          }}
          observations={observations}
        />
        {observations.length ? <Legend items={observations}/> : ""}
        <span className={"d-inline-block text-muted mt-4"}>{departureTimesDay.length.toLocaleString()} horários de partidas no horário de {dayConverted.toLowerCase()}.</span>
      </AccordionItem>
    )
  })

  return (
    <Accordion defaultEventKey={defaultEventKey}>
      {content}
    </Accordion>
  )
}

export default AccordionOperationDays;
