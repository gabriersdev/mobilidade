import {useContext, useEffect, useState} from "react";
import Util from "../../assets/Util.jsx";
import AccordionItem from "../accordion/AccordionItem";
import Table from "./TableDepartureTimes";
import Legend from "../legend/Legend";
import Accordion from "../accordion/Accordion";
import {Theme} from "../themeContext/ThemeContext";

// Função helper para obter o nome do dia atual (pode ficar fora do componente)
const getCurrentDayGroupName = () => {
  switch (new Date().getDay()) {
    case 0:
      return 'domingos';
    case 6:
      return 'sábados';
    default:
      return 'dias úteis';
  }
};

const AccordionOperationDays = () => {
  const {departureTimes, uniqueDaysForDirection, index, direction, directionName, observations} = useContext(Theme);
  
  // 1. Criar estados para o conteúdo assíncrono e a chave padrão do accordion
  const [accordionItems, setAccordionItems] = useState(null);
  const [defaultEventKey, setDefaultEventKey] = useState(['0']);
  
  // 2. Usar useEffect para processar os dados de forma assíncrona
  useEffect(() => {
    const generateContent = async () => {
      // Garante que os dados do contexto já chegaram
      if (!uniqueDaysForDirection?.[index]) {
        return;
      }
      
      const daysForDirection = uniqueDaysForDirection[index];
      const convertedDayNames = await Promise.all(
        daysForDirection.map(day => Util.convertNumberToDay(day))
      );
      
      const currentDayName = getCurrentDayGroupName();
      const defaultIndex = convertedDayNames.findIndex(name =>
        name.toLowerCase().includes(currentDayName.toLowerCase())
      );
      
      // Define a chave do accordion que deve vir aberta
      if (defaultIndex !== -1) {
        setDefaultEventKey([defaultIndex.toString()]);
      }
      
      const content = daysForDirection.map((day, j) => {
        const dayConverted = convertedDayNames[j] || "Dia inválido";
        const departureTimesDay = departureTimes.filter((item) => item.day === day && item.direction === direction);
        
        return (
          <AccordionItem title={dayConverted} eventKey={j.toString()} key={j}>
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
            />
            {observations.length > 0 && <Legend items={observations}/>}
            <span className={"d-inline-block text-muted mt-4"}>
              {departureTimesDay.length.toLocaleString()} horários de partidas no horário de {dayConverted.substring(0, 1).toLowerCase() + dayConverted.substring(1)}.
            </span>
          </AccordionItem>
        );
      });
      
      setAccordionItems(content);
    };
    
    generateContent().then(() => {
    });
    // A dependência garante que o efeito rode quando os dados do contexto mudarem
  }, [departureTimes, uniqueDaysForDirection, index, direction, directionName, observations]);
  
  if (!accordionItems) {
    return <div>Carregando dias de operação...</div>;
  }
  
  // Renderize o accordion com os dados do estado
  return (
    <Accordion defaultEventKey={defaultEventKey}>
      {accordionItems}
    </Accordion>
  );
};

export default AccordionOperationDays;
