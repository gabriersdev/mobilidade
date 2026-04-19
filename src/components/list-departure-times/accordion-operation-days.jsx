import {useContext, useEffect, useState} from "react";
import moment from "moment";
import {Badge, OverlayTrigger, Tooltip} from "react-bootstrap";
import {useLocation} from "react-router-dom";

import Util from "@/assets/Util.jsx";
import AccordionItem from "@/components/ui/accordion/accordion-item.jsx";
import Table from "@/components/list-departure-times/table-departure-times.jsx";
import Legend from "@/components/ui/legend/legend.jsx";
import Accordion from "@/components/ui/accordion/accordion.jsx";
import {ThemeContext} from "@/components/ui/theme-context/theme-context.jsx";
import {TimeContext} from "@/components/list-departure-times/departure-time-context.jsx";
import NoDepartureTimes from "@/components/list-departure-times/no-departure-times.jsx";
import {dateConfigs} from "@/assets/resources.js";

moment.locale(dateConfigs.lang);

// TODO - refatorar componente
const AccordionOperationDays = () => {
    const {defaultEventKey, setDefaultEventKey} = useContext(TimeContext);
    const {departureTimes, uniqueDaysForDirection, index, direction, directionName, observations, type, scope} = useContext(ThemeContext);
    const navigation = useLocation();
    
    // Função helper para obter o nome do dia atual
    const getCurrentDayGroupName = () => Util.getCurrentDayGroupName(scope);
    
    // Cria estados para o conteúdo assíncrono e a chave padrão do accordion
    const [accordionItems, setAccordionItems] = useState(null);
    const [accordionKey, setAccordionKey] = useState(0);
    
    // Usa useEffect para processar os dados de forma assíncrona
    useEffect(() => {
        const generateContent = async () => {
          // Garante que os dados do contexto já chegaram
          if (!uniqueDaysForDirection?.[index]) return;
          
          const daysForDirection = uniqueDaysForDirection[index];
          const convertedDayNames = await Promise.all(
            daysForDirection.map(day => Util.convertNumberToDay(day))
          );
          
          const dayGroup = getCurrentDayGroupName();
          // Ensure dayGroup is an array
          const currentDayNameRaw = Array.isArray(dayGroup) ? dayGroup[0] : dayGroup;
          const currentDayNameIsVacationRaw = Array.isArray(dayGroup) ? dayGroup[1] : null;
          
          const currentDayName = Util.normalize(currentDayNameRaw.toLowerCase());
          const isVacation = currentDayNameIsVacationRaw && (currentDayNameIsVacationRaw.includes('ferias') || currentDayNameIsVacationRaw.includes('férias'));
          
          let bestMatchIndex = -1;
          let bestMatchScore = -1;
          
          convertedDayNames.forEach((name, index) => {
              const normalizedName = Util.normalize(name.toLowerCase());
              const nameHasVacation = normalizedName.includes('ferias') || normalizedName.includes('férias');
              let nameHasDay = normalizedName.includes(currentDayName);
              
              // Special handling for "dia util" vs "dias uteis"
              if (!nameHasDay && currentDayName === 'dia util') nameHasDay = normalizedName.includes('dias uteis') || normalizedName.includes('dia util');
              
              let score = -1;
              
              if (isVacation) {
                // Today is Vacation
                if (nameHasDay) {
                  // Exact match (Day + Vacation)
                  if (nameHasVacation) score = 2;
                  // Fallback (Day only)
                  else score = 1;
                }
              }
              
              //
              else {
                // Today is Normal
                if (nameHasDay) {
                  // Exact match (Day only)
                  if (!nameHasVacation) score = 2;
                    
                  // Day matches, but it is a vacation schedule.
                  // If today is Normal, we should NOT show Vacation schedule.
                  else score = -1;
                }
              }
              
              if (score > bestMatchScore) {
                bestMatchScore = score;
                bestMatchIndex = index;
              }
            }
          );
          
          const defaultIndex = bestMatchIndex;
          
          // Define a chave do accordion que deve vir aberta
          const newDefaultKey = defaultIndex !== -1 ? [defaultIndex.toString()] : [];
          setDefaultEventKey(newDefaultKey);
          
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
            const isToday = defaultIndex === j;
            
            return (
              <div key={j}>
                {/* componente separado para garantir re-render com mudanças no contexto */}
                <NoDepartureTimes isFirst={j === 0}/>
                <div>
                  <AccordionItem
                    eventKey={j.toString()}
                    className={className}
                    title={
                      (
                        <span>
                        {dayConverted}{" "}
                          {isToday && !navigation.pathname.startsWith("/history/") && (
                            <OverlayTrigger overlay={
                              <Tooltip>
                                <span className={"text-sml"}>Este é o itinerário de hoje</span>
                              </Tooltip>
                            }>
                              <Badge bg={"primary"} className={"rounded-pill border-0"}>HOJE</Badge>
                            </OverlayTrigger>
                          )}
                        </span>
                      )
                    }
                  >
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
                    <span className={"text-body-secondary mt-4 text-sml d-block text-balance"}>
                      {departureTimesDay.length.toLocaleString()} horários de partidas no horário de {dayConverted.substring(0, 1).toLowerCase() + dayConverted.substring(1)}.
                    </span>
                  </AccordionItem>
                </div>
              </div>
            );
          });
          
          setAccordionItems(content);
          setAccordionKey(prev => prev + 1);
        };
        
        generateContent().then();
        
        // A dependência garante que o efeito rode quando os dados do contexto mudarem
      }, [uniqueDaysForDirection, direction, directionName, departureTimes, observations, index, scope]
    );
    
    // deps: uniqueDaysForDirection, direction, directionName, index, setDefaultEventKey, departureTimes, observations;
    if (!accordionItems) return <div>Carregando dias de operação...</div>;
    
    // Renderize o accordion com os dados do estado
    return (
      <Accordion defaultEventKey={defaultEventKey || ["0"]} key={accordionKey}>
        {accordionItems}
      </Accordion>
    );
  }
;

export default AccordionOperationDays;
