import {useContext, useEffect, useState} from "react";
import Accordion from "@/components/ui/accordion/accordion.jsx";
import {ThemeContext} from "@/components/ui/theme-context/theme-context.jsx";
import {TimeContext} from "@/components/list-departure-times/departure-time-context.jsx";
import Util from "@/lib/Util.jsx";
import AccordionOperationDayItem from "./accordion-operation-day-item.jsx";

const AccordionOperationDays = () => {
  const {defaultEventKey, setDefaultEventKey} = useContext(TimeContext);
  const {departureTimes, uniqueDaysForDirection, index, direction, directionName, observations, type, scope} = useContext(ThemeContext);
  
  const [dayData, setDayData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!uniqueDaysForDirection?.[index]) return;
      
      const daysForDirection = uniqueDaysForDirection[index];
      const convertedDayNames = await Promise.all(
        daysForDirection.map(day => Util.convertNumberToDay(day))
      );
      
      const defaultIndex = await Util.getBestMatchDayIndex(daysForDirection, scope);
      const newDefaultKey = defaultIndex !== -1 ? [defaultIndex.toString()] : [];
      setDefaultEventKey(newDefaultKey);
      
      setDayData({ daysForDirection, convertedDayNames, defaultIndex });
    };
    
    fetchData().then();
  }, [uniqueDaysForDirection, index, scope, setDefaultEventKey]);
  
  if (!dayData) return <div>Carregando dias de operação...</div>;
  
  const { daysForDirection, convertedDayNames, defaultIndex } = dayData;
  const totalItems = daysForDirection.length;
  
  return (
    <Accordion defaultEventKey={defaultEventKey || ["0"]}>
      {daysForDirection.map((day, j) => {
        const dayConverted = convertedDayNames[j] || "Dia inválido";
        const departureTimesDay = departureTimes.filter((item) => item.day === day && item.direction === direction);
        const isToday = defaultIndex === j;
        
        return (
          <AccordionOperationDayItem
            key={j} j={j} dayConverted={dayConverted} isToday={isToday} totalItems={totalItems}
            departureTimesDay={departureTimesDay} directionName={directionName}
            observations={observations} type={type}
          />
        );
      })}
    </Accordion>
  );
};

export default AccordionOperationDays;
