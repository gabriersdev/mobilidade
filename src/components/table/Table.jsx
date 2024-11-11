import React from "react";
import PropTypes from "prop-types";

const listItems = (data) => {
  const newData = [...data];
  const itemsPerLine = 10;
  const rows = [];

  while (newData.length > 0) {
    rows.push(
      <tr key={Math.floor(rows.length / itemsPerLine)}>
        {newData.splice(0, itemsPerLine).map((item, i) => <td key={`${rows.length}-${i}`}>{item}</td>)}
      </tr>
    );
  }

  return rows;
}

const Table = ({ content }) => {
  return (
    <table>
      <thead>
        <tr>
          {content.head.map((item, i) => <th key={i}>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {listItems(content.data)}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  content: PropTypes.shape({
    head: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
  }).isRequired
}

export default Table;
