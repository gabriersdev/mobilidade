import {useRef} from "react";

import PropTypes from "prop-types";
import "@/components/ui/grid/grid.css";

const Grid = ({className, children, variant}) => {
  const classNameValue = useRef(
    (className ? `grid ${className !== 'main' ? className : ""}` : "grid") +
    (variant ? ` ${variant}` : "")
  );
  
  return (
    <div className={classNameValue.current}>
      {children}
    </div>
  );
}

Grid.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node,
};

export default Grid;
