import {useContext, useState, useEffect} from "react";
import PropTypes from "prop-types";
import {Badge, Table as BootstrapTable} from "react-bootstrap";
import data from "../../data";
import {Theme} from "../themeContext/ThemeContext";
import {TimeContext} from "./DepartureTimeContext";
import moment from "moment";

const TableRow = ({row, directionName, direction, dayName, tableIndex}) => {
  const {defaultEventKey, handlePointClick} = useContext(TimeContext);
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
          style={{cursor: "pointer"}}
        >
          <div className="d-flex align-items-center">
            {item.departureTime}
            
            
            {tableIndex.toString() === defaultEventKey?.[0] && (
              <>
                {moment(`2020-01-01T${moment().format("HH:mm")}:00`).diff(moment(`2020-01-01T${item.departureTime}:00`), "seconds") < -(15 * 60) ? (
                  <div className="text-primary-emphasis d-inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fast-forward-circle-fill pb-1" viewBox="0 0 16 16">
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M4.79 5.093 8 7.386V5.5a.5.5 0 0 1 .79-.407l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 8 10.5V8.614l-3.21 2.293A.5.5 0 0 1 4 10.5v-5a.5.5 0 0 1 .79-.407"/>
                    </svg>
                  </div>
                ) : moment(`2020-01-01T${moment().format("HH:mm")}:00`).diff(moment(`2020-01-01T${item.departureTime}:00`), "seconds") <= 0 && (
                  <div className="text-danger d-inline-flex align-items-center">
                    <span className={"px-1 text-sml"}>Prox.</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fast-forward-circle-fill" viewBox="0 0 16 16">
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M4.79 5.093 8 7.386V5.5a.5.5 0 0 1 .79-.407l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 8 10.5V8.614l-3.21 2.293A.5.5 0 0 1 4 10.5v-5a.5.5 0 0 1 .79-.407"/>
                    </svg>
                  </div>
                )}
              </>
            )}
            
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

const TableDepartureTimes = ({content, tableIndex}) => {
  const [groupedData, setGroupedData] = useState([]);
  const {directionName, direction} = useContext(Theme);
  const {data: listData, dayName} = content;
  
  useEffect(() => {
    // Função para agrupar os horários pelo prefixo da hora (ex: "00", "01")
    const groupByHour = listData.reduce((groups, item) => {
      const hourPrefix = item.departureTime ? item.departureTime.slice(0, 2) : "00"; // Pega os primeiros dois caracteres (a hora)
      if (!groups[hourPrefix]) {
        groups[hourPrefix] = [];
      }
      groups[hourPrefix].push(item);
      return groups;
    }, {});
    
    // Ordena as chaves (horários) para garantir que o agrupamento seja por ordem de hora
    const sortedGroupedData = Object.keys(groupByHour)
      .sort()
      .map((hourPrefix) => groupByHour[hourPrefix]);
    
    setGroupedData(sortedGroupedData);
  }, [listData]); // Recalcular sempre que listData mudar
  
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
};

export default TableDepartureTimes;
