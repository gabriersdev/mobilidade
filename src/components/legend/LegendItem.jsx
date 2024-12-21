import React, {useState} from "react";
import PropTypes from "prop-types";
import { Badge } from "react-bootstrap";

import data from "../../data.js";

const LegendItem = ({ item, i }) => {
  const [clamp, setClamp] = useState(true);

  const handleClamp = (event) => {
    event.preventDefault();
    setClamp(!clamp);
  }

  const bootstrapBGColors = data.bootstrap.bg.colors;
  return (
    <div className={`d-flex align-items-center gap-1 ${!clamp ? "flex-wrap" : ""}`}>
      <span><Badge bg={bootstrapBGColors.at(i) || 'primary'} className={"rounded-5"}>{item.abrev}</Badge></span>
      <span className={clamp ? "line-clamp-1" : 0} onClick={handleClamp}>{item.label}</span>
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
