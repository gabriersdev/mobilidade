import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Badge } from "react-bootstrap";

import data from "../../data.js";

const LegendItem = ({ item, key }) => {
  const count = useRef(-1);
  const bootstrapBGColors = data.bootstrap.bg.colors;
  count.current = count.current === bootstrapBGColors.length - 1 ? 0 : count.current + 1

  console.log(count.current);

  return (
    <div key={key} className="d-flex align-items-center flex-wrap gap-1">
      <span><Badge bg={bootstrapBGColors.at(count) || 'text-bg-primary'}>{item.abrev}</Badge></span>
      <span>{item.label}</span>
    </div>
  )
}

LegendItem.propTypes = {
  item: {
    abrev: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  },
  key: PropTypes.number.isRequired
}
