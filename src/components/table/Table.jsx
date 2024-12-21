import React from "react";
import PropTypes from "prop-types";

import {Badge, Table as BootstrapTable} from 'react-bootstrap';
import data from "../../data.js";

const listItems = (listData, observations) => {
  const newData = [...listData];
  const itemsPerLine = 10;
  const rows = [];

  while (newData.length > 0) {
    rows.push(<tr key={rows.length}>
      {
        newData.splice(0, itemsPerLine).map((item, i) => {
          const bootstrapBGColors = data.bootstrap.bg.colors;
          return (
            <td key={`${rows.length}-${i}`}>
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

const Table = ({content, observations}) => {
  return (<BootstrapTable responsive className="table-line-content mb-0 pb-0">
    <tbody>
    {listItems(content.data, observations)}
    </tbody>
  </BootstrapTable>)
}

Table.propTypes = {
  content: PropTypes.shape({
    data: PropTypes.array.isRequired,
  }).isRequired,
  observations: PropTypes.array
}

export default Table;
