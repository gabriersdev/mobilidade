import React, {useContext, useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";

import {Badge, Table as BootstrapTable} from 'react-bootstrap';
import data from "../../data";
import {Theme} from "../themeContext/ThemeContext";
import {Theme as DepartureTimeTheme} from "./DepartureTimeContext";


const TableRow = ({row, directionName, dayName}) => {
  const {handlePointClick} = useContext(DepartureTimeTheme);
  const bootstrapBGColors = data.bootstrap.bg.colors;

  return (
    <tr>
      {row.map((item, timeOrder) => (
        <td
          key={`${item.departureTime}-${timeOrder}`}
          onClick={(e) => handlePointClick(e, {
            time: item.departureTime,
            timeOrder,
            timeLength: row.length,
            directionName,
            dayName,
            observations: item.observations?.map(observation => ({
              abrev: observation.abrev,
              label: observation.label,
            })),
          })}
          style={{cursor: 'pointer'}}
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

const TableDepartureTimes = ({content}) => {
  const [itemsPerLine, setItemsPerLine] = useState(10);

  useEffect(() => {
    const clientWidth = document.querySelector('html').clientWidth;
    if (clientWidth < 360) setItemsPerLine(2);
    else if (clientWidth < 460) setItemsPerLine(4);
    else if (clientWidth < 768) setItemsPerLine(5);
    else setItemsPerLine(10);
  }, []);

  const {directionName} = useContext(Theme);
  const {data: listData, dayName} = content;

  const rows = useMemo(() => {
    const chunkedData = [];
    for (let i = 0; i < listData.length; i += itemsPerLine) {
      chunkedData.push(listData.slice(i, i + itemsPerLine));
    }
    return chunkedData;
  }, [listData]);

  return (
    <BootstrapTable responsive className="table-line-content mb-0 pb-0">
      <tbody>
      {rows.map((row, index) => (
        <TableRow
          key={index}
          row={row}
          directionName={directionName}
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
  dayName: PropTypes.string.isRequired,
}

export default React.memo(TableDepartureTimes);
