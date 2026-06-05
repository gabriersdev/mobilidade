import {useEffect, useRef, useState} from "react";

import PropTypes from "prop-types";
import "@/components/ui/grid/grid.css";

const Grid = ({className, children, variant}) => {
  const classNameValue = useRef(
    (className ? `grid ${className !== 'main' ? className : ""}` : "grid") +
    (variant ? ` ${variant}` : "")
  );
  
  const [ret, setRet] = useState(<></>);
  
  useEffect(() => {
    if (classNameValue.current) setRet(
      <div className={classNameValue.current}>
        {children}
      </div>
    );
  }, [classNameValue])
  
  return ret;
}

Grid.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node,
};

export default Grid;
