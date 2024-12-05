import React from "react";
import PropTypes from "prop-types";

import {Table as BootstrapTable} from 'react-bootstrap';

const listItems = (data) => {
  const newData = [...data];
  const itemsPerLine = 12;
  const rows = [];

  while (newData.length > 0) {
    rows.push(<tr key={rows.length}>
      {
        newData.splice(0, itemsPerLine).map((item, i) => {
          return (
            <td key={`${rows.length}-${i}`} className={"d-inline-flex gap-1 align-items-center"}>
              {item.departure_time}
              {/*TODO - Usar tooltip*/}
              {item.observation ? <span className="badge bg-secondary" title={item.observation[1]} >{item.observation[0]}</span> : ''}
            </td>
          )
        })
      }
    </tr>);
  }

  return rows;
}

const Table = ({content}) => {
  return (<BootstrapTable responsive className="table-line-content">
    <tbody>
    {listItems(content.data)}
    </tbody>
  </BootstrapTable>)
}

Table.propTypes = {
  content: PropTypes.shape({
    data: PropTypes.array.isRequired
  }).isRequired
}

export default Table;
