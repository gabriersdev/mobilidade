import PropTypes from "prop-types";
import {createContext, useState} from "react";

const Context = createContext({});
  
const LineContext = ({children, line}) => {
  const [firstPointByDirection, setFirstPointByDirection] = useState({});
  
  return (
    <Context.Provider value={Object.assign({}, {firstPointByDirection, setFirstPointByDirection, line})}>
      {children}
    </Context.Provider>
  )
}

LineContext.propTypes = {
  children: PropTypes.node.isRequired,
  line: PropTypes.shape({
    line_number: PropTypes.string.isRequired,
    line_name: PropTypes.string.isRequired,
    departure_location: PropTypes.string.isRequired,
    destination_location: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    company_id: PropTypes.number.isRequired,
    fare: PropTypes.string.isRequired,
    has_integration: PropTypes.number.isRequired,
    scope: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
    count_departure_times: PropTypes.number.isRequired,
    report_contact: PropTypes.string,
    datetime_last_modify: PropTypes.string,
    accessibility: PropTypes.number,
    aircon: PropTypes.number,
    teraflex: PropTypes.number,
    bench: PropTypes.number,
    fleet: PropTypes.number,
    airsuspension: PropTypes.number,
    wifi: PropTypes.number,
    conc: PropTypes.number
  })
}

export {Context, LineContext};
