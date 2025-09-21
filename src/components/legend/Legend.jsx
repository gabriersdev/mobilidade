import PropTypes from "prop-types";

import LegendItem from "./LegendItem";
import defaultLegendItems from "../../assets/default-legend-items.jsx";

const Legend = ({items, marginTop, type}) => {
  if (type !== "history") {
    if (Array.isArray(items)) items = [
      ...items,
      ...defaultLegendItems
    ]
  }
  
  return (
    (items.length > 0) && (
      <div className={`d-flex flex-wrap align-items-start flex-column gap-2 ${marginTop || 'mt-3'}`}>
        <span className={"fs-6 fw-normal mb-1 text-body-secondary"}>Legenda</span>
        {items.map((item, index) => <LegendItem key={index} i={index} item={item}/>)}
      </div>
    )
  )
};

Legend.propTypes = {
  items: PropTypes.array.isRequired,
  marginTop: PropTypes.string,
  type: PropTypes.oneOf(["history", "current"]),
}

export default Legend;
