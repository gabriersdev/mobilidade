import {createContext, useCallback, useState} from "react";
import PropTypes from "prop-types";

const TimeContext = createContext(null);

function DepartureTimeContext({children}) {
  const [show, setShow] = useState(false);
  const [departureTimeOffCanvas, setDepartureTimeOffCanvas] = useState({});
  const [defaultEventKey, setDefaultEventKey] = useState([]);
  const [defaultEventKeys, setDefaultEventKeys] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setDirectionDefaultEventKey = useCallback((directionKey, eventKey) => {
    setDefaultEventKeys((prev) => {
      const prevKey = prev[directionKey];
      if (
        Array.isArray(prevKey) &&
        prevKey.length === eventKey.length &&
        prevKey.every((val, idx) => val === eventKey[idx])
      ) {
        return prev;
      }
      return {...prev, [directionKey]: eventKey};
    });
  }, []);

  function handlePointClick(e, object) {
    e.preventScroll = true;
    setDepartureTimeOffCanvas(object);
    handleShow();
  }

  return (
    <TimeContext.Provider
      value={{
        show,
        departureTimeOffCanvas,
        handleClose,
        handleShow,
        handlePointClick,
        defaultEventKey,
        setDefaultEventKey,
        defaultEventKeys,
        setDirectionDefaultEventKey,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
}

DepartureTimeContext.propTypes = {
  children: PropTypes.node
}

export {TimeContext, DepartureTimeContext};
