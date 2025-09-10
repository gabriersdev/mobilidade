import PropTypes from "prop-types";

import LegendItem from "./LegendItem";
import defaultLegendItems from "../../assets/default-legend-items.jsx";

const Legend = ({items, marginTop}) => {
  if (Array.isArray(items)) items = [
    ...items,
    ...defaultLegendItems
  ];
  
  return (
    <div className={`d-flex flex-wrap align-items-start flex-column gap-2 ${marginTop || 'mt-3'}`}>
      {items && <span className={"fs-6 fw-normal mb-1 text-body-secondary"}>Legenda</span>}
      {items.map((item, index) => <LegendItem key={index} i={index} item={item}/>)}
    </div>
  )
};

Legend.propTypes = {
  items: PropTypes.array.isRequired,
  marginTop: PropTypes.string
}

export default Legend;
