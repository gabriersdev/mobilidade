import {useContext, useEffect, useState} from "react";
import Util from "../../assets/Util.jsx";
import AccordionItem from "../accordion/AccordionItem";
import Table from "./TableDepartureTimes";
import Legend from "../legend/Legend";
import Accordion from "../accordion/Accordion";
import {Theme} from "../themeContext/ThemeContext";
import {TimeContext} from "./DepartureTimeContext.jsx";
import moment from "moment";
import Alert from "../alert/Alert.jsx";

moment.locale("pt-br");

// Função helper para obter o nome do dia atual (pode ficar fora do componente)
const getCurrentDayGroupName = () => {
  switch (moment().get("day")) {
    case 0:
      return 'domingo';
    case 6:
      return 'sábado';
    default:
      return 'dia útil';
  }
};

const AccordionOperationDays = () => {
  const {defaultEventKey, setDefaultEventKey} = useContext(TimeContext);
  const {departureTimes, uniqueDaysForDirection, index, direction, directionName, observations, type} = useContext(Theme);
  
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
      // const daysConv = []
      
      const content = daysForDirection.map((day, j) => {
        const dayConverted = convertedDayNames[j] || "Dia inválido";
        // daysConv.push(dayConverted)
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
            {
              (defaultEventKey.length === 0 && j === 0) && (
                <Alert variant={"warning"}>
                  <p className={"m-0 p-0"}>
                    Essa linha <b>não possui horários de partida {['sábado', 'domingo'].includes(currentDayName) ? "aos" : "em"} {currentDayName}s.</b>
                  </p>
                </Alert>
              )
            }
            
            <div>
              <AccordionItem title={dayConverted} eventKey={j.toString()} className={className}>
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
                <span className={"d-inline-block text-muted mt-4"}>
                  {departureTimesDay.length.toLocaleString()} horários de partidas no horário de {dayConverted.substring(0, 1).toLowerCase() + dayConverted.substring(1)}.
                </span>
              </AccordionItem>
            </div>
          </div>
        );
      });
      
      // Util.getDefaultEventKey(daysConv);
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
