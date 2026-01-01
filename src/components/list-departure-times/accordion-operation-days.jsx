import {useContext, useEffect, useState} from "react";
import Util from "../../assets/Util.jsx";
import AccordionItem from "../ui/accordion/accordion-item.jsx";
import Table from "./table-departure-times.jsx";
import moment from "moment";

import Legend from "../ui/legend/legend.jsx";
import Accordion from "../ui/accordion/accordion.jsx";
import {Theme} from "../ui/theme-context/theme-context.jsx";
import {TimeContext} from "./departure-time-context.jsx";
import NoDepartureTimes from "./no-departure-times.jsx";
import {Badge} from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

moment.locale("pt-br");

const AccordionOperationDays = () => {
  const {defaultEventKey, setDefaultEventKey} = useContext(TimeContext);
  const {departureTimes, uniqueDaysForDirection, index, direction, directionName, observations, type, scope} = useContext(Theme);
  // Função helper para obter o nome do dia atual
  const getCurrentDayGroupName = () => Util.getCurrentDayGroupName(scope);
  
  // 1. Criar estados para o conteúdo assíncrono e a chave padrão do accordion
  const [accordionItems, setAccordionItems] = useState(null);
  
  // 2. Usar useEffect para processar os dados de forma assíncrona
  useEffect(() => {
    const generateContent = async () => {
      // Garante que os dados do contexto já chegaram
      if (!uniqueDaysForDirection?.[index]) return;
      
      const daysForDirection = uniqueDaysForDirection[index];
      const convertedDayNames = await Promise.all(
        daysForDirection.map(day => Util.convertNumberToDay(day))
      );
      
      const currentDayName = getCurrentDayGroupName();
      const defaultIndex = convertedDayNames.findIndex(name =>
        Util.normalize(name.toLowerCase()).includes(Util.normalize(currentDayName.toLowerCase()))
      );
      
      // Define a chave do accordion que deve vir aberta
      if (defaultIndex !== -1) setDefaultEventKey([defaultIndex.toString()]);
      else setDefaultEventKey([]);
      
      const content = daysForDirection.map((day, j) => {
        const dayConverted = convertedDayNames[j] || "Dia inválido";
        const departureTimesDay = departureTimes.filter((item) => item.day === day && item.direction === direction);
        
        const totalItems = daysForDirection.length;
        const classes = ['border-top'];
        
        if (totalItems === 1) classes.push('border-bottom', 'rounded');
        else if (j === 0) classes.push('border-bottom-0', 'rounded-top');
        else if (j === totalItems - 1) classes.push('border-bottom', 'rounded-bottom');
        else classes.push('border-bottom-0');
        
        const className = classes.join(' ');
        
        return (
          <div key={j}>
            {/* componente separado para garantir re-render com mudanças no contexto */}
            <NoDepartureTimes isFirst={j === 0}/>
            <div>
              <AccordionItem title={(
                <span>
                  {dayConverted}{" "}
                  {(defaultEventKey?.toString()?.match(/\d/g).join("") === j.toString()) && (
                    <OverlayTrigger overlay={
                      <Tooltip>
                        <span className={"text-sml"}>Este é o itinerário de hoje</span>
                      </Tooltip>
                    }>
                      <Badge bg={"secondary"} className={"rounded-pill border"}>HOJE</Badge>
                    </OverlayTrigger>
                  )}
                </span>
              )} eventKey={j.toString()} className={className}>
                <Table
                  content={{
                    data: departureTimesDay.map((item) => ({
                      departureTime: Util.formatTime(`2020-01-01 ${item["departure_time"]}`, 'HH:mm'),
                      observations: item.observations ? item.observations : null
                    })),
                    directionName: directionName,
                    dayName: dayConverted
                  }}
                  observations={observations}
                  tableIndex={j}
                />
                <Legend items={observations} type={type || "current"}/>
                <span className={"text-body-secondary mt-4 text-sml"}>
                  {departureTimesDay.length.toLocaleString()} horários de partidas no horário de {dayConverted.substring(0, 1).toLowerCase() + dayConverted.substring(1)}.
                </span>
              </AccordionItem>
            </div>
          </div>
        );
      });
      
      setAccordionItems(content);
    };
    
    generateContent().then(() => {
    });
    // A dependência garante que o efeito rode quando os dados do contexto mudarem
  }, [uniqueDaysForDirection, direction, directionName]);
  // deps: uniqueDaysForDirection, direction, directionName, index, setDefaultEventKey, departureTimes, observations
  
  if (!accordionItems) {
    return <div>Carregando dias de operação...</div>;
  }
  
  // Renderize o accordion com os dados do estado
  return (
    <Accordion defaultEventKey={defaultEventKey || ["0"]}>
      {accordionItems}
    </Accordion>
  );
};

export default AccordionOperationDays;
