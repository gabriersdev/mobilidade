import {createContext, useState} from "react";
import PropTypes from "prop-types";

const TimeContext = createContext({});

const DepartureTimeContext = ({children}) => {
  const [show, setShow] = useState(false);
  const [departureTimeOffCanvas, setDepartureTimeOffCanvas] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handlePointClick = (e, object) => {
    e.preventScroll = true;
    setDepartureTimeOffCanvas(object);
    handleShow();
  }
  
  return (
    <TimeContext.Provider value={Object.assign({}, {show, departureTimeOffCanvas, handleClose, handleShow, handlePointClick})}>
      {children}
    </TimeContext.Provider>
  )
}

DepartureTimeContext.propTypes = {
  children: PropTypes.node
}

export {TimeContext, DepartureTimeContext};
