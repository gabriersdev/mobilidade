import React from "react";
import PropTypes from "prop-types";

import {Badge, Table as BootstrapTable} from 'react-bootstrap';
import data from "../../data.js";

const listItems = (listData, observations, handlePointClick, directionName, dayName) => {
  const newData = [...listData];
  const itemsPerLine = 10;
  const rows = [];

  while (newData.length > 0) {
    rows.push(<tr key={rows.length}>
      {
        newData.splice(0, itemsPerLine).map((item, i) => {
          const bootstrapBGColors = data.bootstrap.bg.colors;
          return (
            <td key={`${rows.length}-${i}`} onClick={e => handlePointClick(e, {
              time: item.departure_time,
              // observations: item.observation ? [{abrev: item.observation[0], label: item.observation[1]}] : null,
              time_ordernation: i,
              times_lenght: listData.length,
              directionName: directionName,
              dayName: dayName,
              observations: item.observations ? item.observations.map(observation => {
                return {
                  abrev: observation.abrev,
                  label: observation.label
                }
              }) : null
            })}
                style={{cursor: 'pointer'}}
            >
              <div className={"d-flex align-items-center"}>
                {item.departure_time}
                {item.observations ?
                  item.observations.map((observation, i) => {
                    return <Badge key={i} className="ms-1" bg={bootstrapBGColors[observation.index]}>
                      {observation.abrev}
                    </Badge>
                  })
                  : ''}
              </div>
            </td>
          )
        })
      }
    </tr>);
  }

  return rows;
}

const Table = ({content, observations, handlePointClick}) => {
  return (<BootstrapTable responsive className="table-line-content mb-0 pb-0">
    <tbody>
    {listItems(content.data, observations, handlePointClick, content.directionName, content.dayName)}
    </tbody>
  </BootstrapTable>)
}

Table.propTypes = {
  content: PropTypes.shape({
    data: PropTypes.array.isRequired,
    directionName: PropTypes.string.isRequired,
    dayName: PropTypes.string.isRequired
  }).isRequired,
  observations: PropTypes.array,
  handlePointClick: PropTypes.func.isRequired
}

export default React.memo(Table);
