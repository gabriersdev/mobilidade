import React from "react";
import PropTypes from "prop-types";

import LegendItem from "./LegendItem";

const Legend = ({ items }) => {
  return (
    <div className="d-flex flex-wrap align-items-center gap-2">
      {items.map((item, index) => <LegendItem key={index} i={index} item={item} />)}
    </div>
  )
};

Legend.propTypes = {
  items: PropTypes.array.isRequired
}

export default Legend;
