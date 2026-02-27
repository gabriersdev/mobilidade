import moment from "moment";
import PropTypes from "prop-types";
import {useCallback} from "react";
import Util from "../../assets/Util.jsx";

moment.locale("pt-BR");

export default function LiveListSingleLine({data}) {
  const filtered = useCallback((d, i, self) => {
    return i === self.findIndex(other =>
      other.line_number === d.line_number &&
      other.departure_time_trip === d.departure_time_trip
    );
  }, []);
  
  return (
    <ul style={{listStyleType: "none"}} className={"mt-0 mb-3 p-0"}>
      {
        data.filter(filtered)
          .toSorted((a, b) => {
            return moment(a?.["expected_arrival_time"]).utc() > moment(b?.["expected_arrival_time"]).utc()
          })
          .toSpliced(50)
          .map((d, i) => (
            <li key={i} className="d-flex align-items-center gap-2 monospace text-truncate">
              <span className="fw-bold ff-inherit text-info">{d?.["line_number"]}</span>
              <span className={"ff-inherit"}>{d?.["departure_location"]} ⇄ {d?.["destination_location"]}</span>
              <span className="text-body-secondary ff-inherit">{Util.diffToHuman(d?.["expected_arrival_time"])}</span>
            </li>
          ))
      }
    </ul>
  )
}

LiveListSingleLine.propTypes = {
  data: PropTypes.array.isRequired,
}
