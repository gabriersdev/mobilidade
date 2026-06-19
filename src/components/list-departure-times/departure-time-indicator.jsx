import {useState, useEffect} from "react";
import PropTypes from "prop-types";
import moment from "moment";

const DepartureTimeIndicator = ({ departureTime, tableIndex, defaultEventKey, type }) => {
  const [indicator, setIndicator] = useState(null);
  
  useEffect(() => {
    const updateIndicator = () => {
      if (type === "history" || tableIndex.toString() !== defaultEventKey?.[0]) {
        setIndicator(null);
        return;
      }
      
      const now = moment(`2020-01-01T${moment().format("HH:mm")}:00`);
      const departure = moment(`2020-01-01T${departureTime}:00`);
      const diffSeconds = now.diff(departure, "seconds");
      
      if (diffSeconds < -(15 * 60)) {
        setIndicator(
          <div className="text-secondary d-inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fast-forward-circle-fill pb-1" viewBox="0 0 16 16">
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M4.79 5.093 8 7.386V5.5a.5.5 0 0 1 .79-.407l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 8 10.5V8.614l-3.21 2.293A.5.5 0 0 1 4 10.5v-5a.5.5 0 0 1 .79-.407"/>
            </svg>
          </div>
        );
      } else if (diffSeconds <= 0) {
        setIndicator(
          <div className="text-danger d-inline-flex align-items-center">
            <span className={"px-1 text-sml"}>Prox.</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fast-forward-circle-fill" viewBox="0 0 16 16">
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M4.79 5.093 8 7.386V5.5a.5.5 0 0 1 .79-.407l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 8 10.5V8.614l-3.21 2.293A.5.5 0 0 1 4 10.5v-5a.5.5 0 0 1 .79-.407"/>
            </svg>
          </div>
        );
      } else {
        setIndicator(null);
      }
    };
    
    updateIndicator();
    const intervalId = setInterval(updateIndicator, 1000);
    
    return () => clearInterval(intervalId);
  }, [departureTime, tableIndex, defaultEventKey, type]);
  
  return indicator;
};

DepartureTimeIndicator.propTypes = {
  departureTime: PropTypes.string.isRequired,
  tableIndex: PropTypes.number.isRequired,
  defaultEventKey: PropTypes.array,
  type: PropTypes.oneOf(["history", "current"]),
};

export default DepartureTimeIndicator;
