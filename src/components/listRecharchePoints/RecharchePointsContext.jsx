import PropTypes from "prop-types";
import {useState} from "react";

import {ThemeContext} from "../themeContext/ThemeContext";

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
    <ThemeContext value={{show, handleClose, rechargePointOffCanvas, handlePointClick}}>
      {children}
    </ThemeContext>
  )
}

RecharchePointsContext.propTypes = {
  children: PropTypes.node.isRequired
}

export default RecharchePointsContext;
