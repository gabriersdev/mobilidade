import {createContext, useState} from "react";
import PropTypes from "prop-types";

const RechargeContext = createContext({});

const RecharchePointsContext = ({children}) => {
  const [show, setShow] = useState(false);
  const [rechargePointOffCanvas, setRechargePointOffCanvas] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePointClick = (e, point_data) => {
    e.stopPropagation();
    e.preventScroll = true;
    
    if (!point_data.link_google_maps.includes("maps")) {
      window.open(point_data.link_google_maps, "_blank", "noreferrer noopener");
      return;
    }
    
    setRechargePointOffCanvas({
      ...point_data,
      link: point_data.link_google_maps
    })
    handleShow();
  }

  return (
    <RechargeContext.Provider value={{show, handleClose, rechargePointOffCanvas, handlePointClick}}>
      {children}
    </RechargeContext.Provider>
  )
}

RecharchePointsContext.propTypes = {
  children: PropTypes.node.isRequired
}

export {RechargeContext, RecharchePointsContext};
