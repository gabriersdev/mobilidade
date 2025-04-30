import PropTypes from "prop-types";
import "./grid.css";

const Grid = ({classes, children, variant}) => {
  return <div className={(classes ? `grid ${classes}` : "grid") + (variant ? ` ${variant}` : "")}>{children}</div>;
}

Grid.propTypes = {
  classes: PropTypes.string, children: PropTypes.node.isRequired,
  variant: PropTypes.string
};

export default Grid;
