import React from "react";
import PropTypes from "prop-types";

import "./Grid.css";

const Grid = ({ classes, children }) => {
  return <div className={classes ? `grid ${classes}` : "grid"}>{children}</div>;
}

Grid.propTypes = {
  classes: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Grid;
