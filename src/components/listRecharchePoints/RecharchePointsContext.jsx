import React, {useState} from "react";
import PropTypes from "prop-types";

const RechargeContext = React.createContext({});

const RecharchePointsContext = ({children}) => {
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
    <RechargeContext.Provider value={{show, handleClose, rechargePointOffCanvas, handlePointClick}}>
      {children}
    </RechargeContext.Provider>
  )
}

RecharchePointsContext.propTypes = {
  children: PropTypes.node.isRequired
}

export {RechargeContext, RecharchePointsContext};
