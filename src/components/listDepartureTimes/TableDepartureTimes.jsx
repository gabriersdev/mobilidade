import { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Badge, Table as BootstrapTable } from "react-bootstrap";
import data from "../../data";
import { Theme } from "../themeContext/ThemeContext";
import { TimeContext } from "./DepartureTimeContext";

const TableRow = ({ row, directionName, direction, dayName }) => {
  const { handlePointClick } = useContext(TimeContext);
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

const TableDepartureTimes = ({ content }) => {
  const [groupedData, setGroupedData] = useState([]);
  const { directionName, direction } = useContext(Theme);
  const { data: listData, dayName } = content;

  useEffect(() => {
    // Função para agrupar os horários pelo prefixo da hora (ex: "00", "01")
    const groupByHour = listData.reduce((groups, item) => {
      const hourPrefix = item.departureTime.slice(0, 2); // Pega os primeiros dois caracteres (a hora)
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
};

TableRow.propTypes = {
  row: PropTypes.array.isRequired,
  directionName: PropTypes.string.isRequired,
  direction: PropTypes.number.isRequired,
  dayName: PropTypes.string.isRequired,
};

export default TableDepartureTimes;
