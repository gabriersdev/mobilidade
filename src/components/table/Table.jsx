import React from "react";
import PropTypes from "prop-types";

import { Table as BootstrapTable } from 'react-bootstrap';

const listItems = (data) => {
  const newData = [...data];
  const itemsPerLine = 12;
  const rows = [];

  console.log('INIT ##')
  while (newData.length > 0) {
    rows.push(
      <tr key={rows.length}>
        {newData.splice(0, itemsPerLine).map((item, i) => <td key={`${rows.length}-${i}`}>{JSON.stringify(item)}</td>)}
      </tr>
    );
  }

  return rows;
}

const Table = ({ content }) => {
  console.log(content)
  return (
    <BootstrapTable responsive className="table-line-content">
      <tbody>
        {listItems(content.data)}
      </tbody>
    </BootstrapTable>
  )
}

Table.propTypes = {
  content: PropTypes.shape({
    data: PropTypes.array.isRequired
  }).isRequired
}

export default Table;
