import {useContext} from "react";
import Util from "../../assets/Util";
import AccordionItem from "../accordion/AccordionItem";
import Table from "./TableDepartureTimes";
import Legend from "../legend/Legend";
import Accordion from "../accordion/Accordion";
import {Theme} from "../themeContext/ThemeContext";

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
    if (Util.convertNumberToDay(day).toLowerCase().includes(currDayName().toLowerCase())) defaultEventKey = [j.toString()];
    return (
      <AccordionItem title={Util.convertNumberToDay(day)} eventKey={j.toString()} key={j}>
        <Table
          content={{
            data: departureTimes.filter((item) => item.day === day && item.direction === direction).map((item) => {
              return {
                departureTime: Util.formatTime(`2020-01-01 ${item.departure_time}`, 'HH:mm'),
                observations: item.observations ? item.observations : null
              }
            }),
            directionName: directionName,
            dayName: Util.convertNumberToDay(day)
          }}
          observations={observations}
        />
        {observations.length ? <Legend items={observations}/> : ""}
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
