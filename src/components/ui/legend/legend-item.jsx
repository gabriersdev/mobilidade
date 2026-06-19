import {useState, forwardRef} from "react";
import PropTypes from "prop-types";
import {Badge} from "react-bootstrap";

import data from "@/assets/data.js";

const LegendItem = forwardRef(({item, i, ...props}, ref) => {
  const [clamp, setClamp] = useState(false);
  
  const handleClamp = (event) => {
    event.preventDefault();
    setClamp(!clamp);
  }
  
  const bootstrapBGColors = data.bootstrap.bg.colors;
  return (
    <div ref={ref} {...props} className={`d-flex align-items-center gap-1 ${!clamp ? "flex-wrap" : ""}`}>
      <span><Badge bg={item.color || bootstrapBGColors.at(i) || "primary"} className={"rounded-5"}>{item.abrev}</Badge></span>
      <span className={clamp ? "line-clamp-1" : 0} onClick={handleClamp}>{item.label}</span>
    </div>
  )
});

LegendItem.displayName = "LegendItem";

LegendItem.propTypes = {
  item: PropTypes.shape({
    abrev: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string,
  }).isRequired,
  i: PropTypes.number.isRequired
}

export default LegendItem;
