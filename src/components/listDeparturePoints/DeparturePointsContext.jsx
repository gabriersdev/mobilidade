import PropTypes from "prop-types";
import {useState, createContext} from "react";

const Theme = createContext({});

const DeparturePointsContext = ({children}) => {
  const [show, setShow] = useState(false);
  const [pointDataOffcanvas, setPointDataOffcanvas] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePointClick = (e, {address, point_name, points_lenght, point_ordenation}) => {
    e.preventScroll = true;
    setPointDataOffcanvas({
      address: address,
      point_name: point_name,
      points_lenght: points_lenght,
      point_ordenation: point_ordenation
    });
    handleShow();
  }

  return (
    <Theme.Provider value={Object.assign({}, {show,  pointDataOffcanvas, handleClose, handleShow, handlePointClick})}>
      {children}
    </Theme.Provider>
  )
}

DeparturePointsContext.propTypes = {
  children: PropTypes.node
}

export {Theme, DeparturePointsContext};
