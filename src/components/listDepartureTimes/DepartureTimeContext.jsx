import PropTypes from "prop-types";
import {useState, createContext} from "react";

const Theme = createContext({});

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
    <Theme.Provider value={Object.assign({}, {show, departureTimeOffCanvas, handleClose, handleShow, handlePointClick})}>
      {children}
    </Theme.Provider>
  )
}

DepartureTimeContext.propTypes = {
  children: PropTypes.node
}

export {Theme, DepartureTimeContext};
