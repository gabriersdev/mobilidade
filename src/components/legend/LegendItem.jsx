import React from "react";
import PropTypes from "prop-types";
import { Badge } from "react-bootstrap";

import data from "../../data.js";

const LegendItem = ({ item, i }) => {
  const bootstrapBGColors = data.bootstrap.bg.colors;
  return (
    <div className="d-flex align-items-center flex-wrap gap-1">
      <span><Badge bg={bootstrapBGColors.at(i) || 'primary'}>{item.abrev}</Badge></span>
      <span>{item.label}</span>
    </div>
  )
}

LegendItem.propTypes = {
  item: PropTypes.shape({
    abrev: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired,
  i: PropTypes.number.isRequired
}

export default LegendItem;
