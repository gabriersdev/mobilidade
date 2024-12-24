import React from "react";
import PropTypes from "prop-types";

import {Badge, Table as BootstrapTable} from 'react-bootstrap';
import data from "../../data.js";

const listItems = (listData, observations, handlePointClick) => {
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
              observations: item.observation ? [{abrev: item.observation[0], label: item.observation[1]}] : null,
              time_ordernation: i,
              times_lenght: listData.length
            })}
                style={{cursor: 'pointer'}}
            >
              <div className={"d-flex align-items-center"}>
                {item.departure_time}
                {item.observation ? <Badge
                  bg={bootstrapBGColors.at(observations.findIndex((o) => o.abrev === item.observation[0])) || 'primary'}
                  className={"ms-1 rounded-5"} title={item.observation[1]}>{item.observation[0]}</Badge> : ''}
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
    {listItems(content.data, observations, handlePointClick)}
    </tbody>
  </BootstrapTable>)
}

Table.propTypes = {
  content: PropTypes.shape({
    data: PropTypes.array.isRequired,
  }).isRequired,
  observations: PropTypes.array,
  handlePointClick: PropTypes.func.isRequired
}

export default Table;
