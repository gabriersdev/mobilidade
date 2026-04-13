import moment from "moment";
import PropTypes from "prop-types";
import {useCallback, useRef} from "react";

import LiveListItem from "./live-list-item.jsx";
import {filterUniqueLines, sortDataByArrivalTime, getNextDepartures} from "./live-list-helpers.js";

moment.locale("pt-BR");

export default function LiveListResults({data, dataNextDepartureTimes, configs}) {
  const nextDepartureTimes = useRef(dataNextDepartureTimes);
  
  const handleGetNextDepartures = useCallback((lineId, expectedArrivalTime, departureTimeTrip) => {
    return getNextDepartures(nextDepartureTimes.current, lineId, expectedArrivalTime, departureTimeTrip);
  }, []);
  
  const processedData = data
    .filter(filterUniqueLines)
    .sort(sortDataByArrivalTime)
    .slice(0, 50);
  
  return (
    <ul style={{listStyleType: "none"}} className={"m-0 p-0"}>
      {processedData.map((d, i) => (
        <LiveListItem
          key={`${d.line_id}-${d.departure_time_trip}`}
          d={d}
          i={i}
          configs={configs}
          getNextDepartureTimes={handleGetNextDepartures}
        />
      ))}
    </ul>
  );
}

LiveListResults.propTypes = {
  data: PropTypes.array.isRequired,
  dataNextDepartureTimes: PropTypes.array.isRequired,
  configs: PropTypes.object.isRequired,
};
