import {useState, useEffect} from "react";
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
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const ListDepartureTimes = ({line_id, departure_location, destination_location}) => {
  const {data, observations, error, isLoaded} = useDepartureTimes(line_id);
  
  const [sortedDays, setSortedDays] = useState(null);
  const [processingError, setProcessingError] = useState(null);
  
  useEffect(() => {
    // Só executa se os dados da API já tiverem chegado
    if (data && data.length > 0) {
      
      // Função async interna para permitir o uso de 'await'
      const processAndSortDays = async () => {
        try {
          // A lógica de preparação dos dados fica aqui dentro
          const uniqueDirections = data.map((item) => item.direction).filter((value, index, self) => self.indexOf(value) === index);
          const uniqueDaysForDirection = uniqueDirections.map((direction) => data.filter((item) => item.direction === direction).map((item) => item.day).filter((value, index, self) => self.indexOf(value) === index));
          
          const result = await Promise.all(uniqueDaysForDirection.map(async directionItems => {
            const dayPairs = await Promise.all(
              directionItems.map(async i => {
                const dayName = await Util.convertNumberToDay(i);
                // Validação para evitar erro com 'null' ou 'undefined' no localeCompare
                if (!dayName) {
                  throw new Error(`Falha ao converter o dia para o número: ${i}`);
                }
                return [i, dayName];
              })
            );
            
            return dayPairs
              .sort((a, b) => a[1].localeCompare(b[1]))
              .map(pair => pair[0]);
          }));
          
          // 4. Se tudo der certo, atualiza o estado com os dias ordenados
          setSortedDays(result);
          
        } catch (err) {
          // 5. Se qualquer promise for rejeitada, captura o erro e atualiza o estado de erro
          console.error("Erro ao processar os dias de operação:", err);
          setProcessingError(err);
        }
      };
      
      processAndSortDays().then(() => {
      });
    }
  }, [data]); // A dependência [data] garante que o efeito rode quando os dados chegarem
  
  // Lógica de Renderização
  
  if (isLoaded) {
    return <div>Carregando...</div>;
  }
  if (error) { // Erro vindo do hook useDepartureTimes
    return <FeedbackError code={error.response?.status || 500} text={error.message} type={'card'}/>;
  }
  if (processingError) { // Erro vindo do nosso processamento interno
    return <Alert variant={'danger'}><span>Ocorreu um erro ao organizar os horários. Tente novamente mais tarde.</span></Alert>
  }
  if (data.length === 0) {
    return <Alert variant={'info'}><span>Não localizamos horários para esta linha.</span></Alert>
  }
  
  // 6. Enquanto os dias estão sendo ordenados, mostramos uma mensagem
  if (!sortedDays) {
    return <div>Organizando horários...</div>;
  }
  
  // Se tudo correu bem, renderiza o conteúdo final
  const departureTimes = data.toSorted((a, b) => a.day - b.day);
  const uniqueDirections = departureTimes.map((item) => item.direction).filter((value, index, self) => self.indexOf(value) === index);
  
	// TODO - usar a funcao que procura algum dia correspondente para usar no defaultEventKey
  return (
    <AnimatePresence mode={"wait"}>
      <AnimatedComponent>
        <DepartureTimeContext>
          <Accordion defaultEventKey={['0']} id={"departure-times-data"}>
            <OffcanvasDepartureTimes/>
            {uniqueDirections.map((direction, i) => {
              const directionName =
                direction === 1 ? (`Sentido ida - ${departure_location} -> ${destination_location}`) :
                  direction === 0 ? (`Sentido único - ${departure_location} <-> ${destination_location} (ida e volta)`) :
                    direction === 2 ? (`Sentido volta - ${destination_location} -> ${departure_location}`) : "";
              return (
                <AccordionItem
                  title={directionName}
                  eventKey={i.toString()} key={i}>
                  <ThemeContext value={{
                    departureTimes,
                    // 7. Usa o estado 'sortedDays' com os dados corretos e ordenados
                    uniqueDaysForDirection: sortedDays,
                    index: i,
                    direction,
                    directionName,
                    observations
                  }}>
                    <AccordionOperationDays/>
                    <div className={"d-flex gap-2 flex-wrap align-items-center mt-4"}>
                      <OverlayTrigger overlay={<Tooltip>Não houve alteração no quadro de horários</Tooltip>}>
                        <span><i className="bi bi-dash-circle-fill text-primary"></i></span>
                      </OverlayTrigger>
                      <span className={"d-inline-block text-muted"}> {departureTimes.length.toLocaleString()} horários de partidas neste sentido.</span>
                    </div>
                  </ThemeContext>
                </AccordionItem>
              )
            })}
          </Accordion>
        </DepartureTimeContext>
      </AnimatedComponent>
    </AnimatePresence>
  );
}

ListDepartureTimes.propTypes = {
  line_id: PropTypes.number.isRequired,
  departure_location: PropTypes.string.isRequired,
  destination_location: PropTypes.string.isRequired
}

export {ListDepartureTimes};
