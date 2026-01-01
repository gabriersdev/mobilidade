import PropTypes from "prop-types";
import "./grid.css";

const Grid = ({className, children, variant}) => {
  return <div className={(className ? `grid ${className !== 'main' ? className : ""}` : "grid") + (variant ? ` ${variant}` : "")}>{children}</div>;
}

Grid.propTypes = {
  className: PropTypes.string, children: PropTypes.node,
  variant: PropTypes.string
};

export default Grid;
