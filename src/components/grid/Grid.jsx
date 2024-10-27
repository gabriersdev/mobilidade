import React from "react";
import PropTypes from "prop-types";

import "./Grid.css";

const Grid = ({ childrens }) => {
  return <div className="grid">{childrens}</div>;
}

Grid.propTypes = {
  childrens: PropTypes.node.isRequired,
};

export default Grid;
