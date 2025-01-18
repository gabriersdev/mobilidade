import {useContext} from "react";

import {Theme} from "../themeContext/ThemeContext";
import AccordionItem from "../accordion/AccordionItem";
import Util from "../../assets/Util";
import Table from "./TableDepartureTimes";
import Legend from "../legend/Legend";
import Accordion from "../accordion/Accordion";

const AccordionOperationDays = () => {
  const {departureTimes, uniqueDaysForDirection, index, direction, directionName, observations} = useContext(Theme)

  return (
    <Accordion defaultEventKey={['0']}>
      {uniqueDaysForDirection[index].map((day, j) => {
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
      })}
    </Accordion>
  )
}

export default AccordionOperationDays;
