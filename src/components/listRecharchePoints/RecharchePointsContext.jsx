import PropTypes from "prop-types";
import {createContext, useState} from "react";

const Theme = createContext({});

const RecharchePointsContext = ({children}) => {
  return null;

  const [show, setShow] = useState(false);
  const [rechargePointOffCanvas, setRechargePointOffCanvas] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePointClick = (e, point_data) => {
    e.stopPropagation();
    e.preventScroll = true;
    setRechargePointOffCanvas({
      ...point_data,
      link: point_data.link_google_maps
    })
    handleShow();
  }

  return (
    <Theme.Provider value={{show, handleClose, rechargePointOffCanvas, handlePointClick}}>
      {children}
    </Theme.Provider>
  )
}

RecharchePointsContext.propTypes = {
  children: PropTypes.node.isRequired
}

export {Theme, RecharchePointsContext};
