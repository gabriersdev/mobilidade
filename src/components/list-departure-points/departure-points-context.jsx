import {createContext, useState} from "react";
import PropTypes from "prop-types";

const DPContext = createContext({});

const DeparturePointsContext = ({children}) => {
  const [show, setShow] = useState(false);
  const [pointDataOffcanvas, setPointDataOffcanvas] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // TODO - refatorar e usar camelCase ao invés de _
  const handlePointClick = (e, {address, point_name, points_length, point_order: point_order, departure_point_id}) => {
    e.preventScroll = true;
    setPointDataOffcanvas({
      address: address,
      point_name: point_name,
      points_length: points_length,
      point_order: point_order,
      departure_point_id: departure_point_id
    });
    handleShow();
  }

  return (
    <DPContext.Provider value={Object.assign({}, {show,  pointDataOffcanvas, handleClose, handleShow, handlePointClick})}>
      {children}
    </DPContext.Provider>
  )
}

DeparturePointsContext.propTypes = {
  children: PropTypes.node
}

export {DPContext, DeparturePointsContext};
