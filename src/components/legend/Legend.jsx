import React from "react";
import PropTypes from "prop-types";

import LegendItem from "./LegendItem";

const Legend = ({ items, marginTop }) => {
  return (
    <div className={`d-flex flex-wrap align-items-start flex-column gap-2 ${marginTop || 'mt-3'}`}>
      {items.map((item, index) => <LegendItem key={index} i={index} item={item} />)}
    </div>
  )
};

Legend.propTypes = {
  items: PropTypes.array.isRequired,
  marginTop: PropTypes.string
}

export default Legend;
