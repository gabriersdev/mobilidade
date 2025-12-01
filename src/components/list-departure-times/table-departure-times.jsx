import {useContext, useState, useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {Badge, Table as BootstrapTable} from "react-bootstrap";

import data from "../../assets/data.js";
import {Theme} from "../ui/theme-context/theme-context.jsx";
import {TimeContext} from "./departure-time-context.jsx";

// Componente para a lógica de 'Próximo' e 'Avançar' que precisa de atualização em tempo real
const DepartureTimeIndicator = ({ departureTime, tableIndex, defaultEventKey, type }) => {
  const [indicator, setIndicator] = useState(null);
  
  useEffect(() => {
    const updateIndicator = () => {
      if (type === "history" || tableIndex.toString() !== defaultEventKey?.[0]) {
        setIndicator(null);
        return;
      }
      
      const now = moment(`2020-01-01T${moment().format("HH:mm")}:00`);
      const departure = moment(`2020-01-01T${departureTime}:00`);
      const diffSeconds = now.diff(departure, "seconds");
      
      if (diffSeconds < -(15 * 60)) { // Mais de 15 minutos no futuro
        setIndicator(
          <div className="text-secondary d-inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fast-forward-circle-fill pb-1" viewBox="0 0 16 16">
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M4.79 5.093 8 7.386V5.5a.5.5 0 0 1 .79-.407l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 8 10.5V8.614l-3.21 2.293A.5.5 0 0 1 4 10.5v-5a.5.5 0 0 1 .79-.407"/>
            </svg>
          </div>
        );
      } else if (diffSeconds <= 0) { // No passado recente ou agora
        setIndicator(
          <div className="text-danger d-inline-flex align-items-center">
            <span className={"px-1 text-sml"}>Prox.</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fast-forward-circle-fill" viewBox="0 0 16 16">
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M4.79 5.093 8 7.386V5.5a.5.5 0 0 1 .79-.407l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 8 10.5V8.614l-3.21 2.293A.5.5 0 0 1 4 10.5v-5a.5.5 0 0 1 .79-.407"/>
            </svg>
          </div>
        );
      } else {
        setIndicator(null); // Horário já passou
      }
    };
    
    updateIndicator(); // Executa na montagem
    const intervalId = setInterval(updateIndicator, 1000); // Atualiza a cada segundo
    
    return () => clearInterval(intervalId); // Limpa o intervalo na desmontagem
  }, [departureTime, tableIndex, defaultEventKey, type]);
  
  return indicator;
};

DepartureTimeIndicator.propTypes = {
  departureTime: PropTypes.string.isRequired,
  tableIndex: PropTypes.number.isRequired,
  defaultEventKey: PropTypes.array, // Pode ser null ou array
  type: PropTypes.oneOf(["history", "current"]),
};


const TableRow = ({ row, directionName, direction, dayName, tableIndex, type }) => {
  const { defaultEventKey, handlePointClick } = useContext(TimeContext);
  const bootstrapBGColors = data.bootstrap.bg.colors;
  
  return (
    <tr>
      {row.map((item, timeOrder) => (
        <td
          key={`${item.departureTime}-${timeOrder}`}
          onClick={(e) =>
            handlePointClick(e, {
              time: item.departureTime,
              timeOrder,
              timeLength: row.length,
              directionName,
              direction,
              dayName,
              observations: item.observations?.map((observation) => ({
                abrev: observation.abrev,
                label: observation.label,
              })),
            })
          }
          style={{ cursor: "pointer" }}
        >
          <div className="d-flex align-items-center">
            {item.departureTime}
            
            <DepartureTimeIndicator
              departureTime={item.departureTime}
              tableIndex={tableIndex}
              defaultEventKey={defaultEventKey}
              type={type}
            />
            
            {item.observations?.map((observation, i) => (
              <Badge key={i} className="ms-1" bg={bootstrapBGColors[observation.index]}>
                {observation.abrev}
              </Badge>
            ))}
          </div>
        </td>
      ))}
    </tr>
  );
};

const TableDepartureTimes = ({ content, tableIndex }) => {
  const { directionName, direction, type } = useContext(Theme);
  const { data: listData, dayName } = content;
  const [isLoading, setIsLoading] = useState(true);
  
  // Use useMemo para agrupar os dados apenas quando listData muda
  const groupedData = useMemo(() => {
    setIsLoading(true); // Indica que o agrupamento está começando
    const groupByHour = listData.reduce((groups, item) => {
      const hourPrefix = item.departureTime ? item.departureTime.slice(0, 2) : "00";
      if (!groups[hourPrefix]) {
        groups[hourPrefix] = [];
      }
      groups[hourPrefix].push(item);
      return groups;
    }, {});
    
    const sortedGroupedData = Object.keys(groupByHour)
      .sort()
      .map((hourPrefix) => groupByHour[hourPrefix]);
    
    setIsLoading(false); // Indica que o agrupamento terminou
    return sortedGroupedData;
  }, [listData]);
  
  // Se estiver carregando, mostra o feedback
  if (isLoading) {
    return (<div>Organizando horários...</div>);
  }
  
  // Se os dados estiverem agrupados e não estiver carregando, mostra a tabela
  return (
    <BootstrapTable responsive className="table-line-content mb-0 pb-0">
      <tbody>
      {groupedData.map((row, index) => (
        <TableRow
          key={index}
          tableIndex={tableIndex}
          row={row}
          directionName={directionName}
          direction={direction}
          dayName={dayName}
          type={type || "current"}
        />
      ))}
      </tbody>
    </BootstrapTable>
  );
};

TableDepartureTimes.propTypes = {
  content: PropTypes.shape({
    data: PropTypes.array.isRequired,
    dayName: PropTypes.string.isRequired,
  }).isRequired,
  tableIndex: PropTypes.number.isRequired,
};

TableRow.propTypes = {
  row: PropTypes.array.isRequired,
  directionName: PropTypes.string.isRequired,
  direction: PropTypes.number.isRequired,
  dayName: PropTypes.string.isRequired,
  tableIndex: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["history", "current"]),
};

export default TableDepartureTimes;
