import moment from "moment";
import PropTypes from "prop-types";
import {useCallback} from "react";
import Util from "../../assets/Util.jsx";
import {Link} from "react-router-dom";
import LiveShowItem from "./live-show-item.jsx";

moment.locale("pt-BR");

export default function LiveListSingleLine({data, configs}) {
  const filtered = useCallback((d, i, self) => {
    return i === self.findIndex(other =>
      other.line_number === d.line_number &&
      other.departure_time_trip === d.departure_time_trip
    );
  }, []);

  return (
    <ul style={{listStyleType: "none"}} className={"mt-0 mb-3 p-0 d-flex flex-column gap-2"}>
      {
        data.filter(filtered)
          .toSorted((a, b) => {
            return moment(a?.["expected_arrival_time"]).utc() > moment(b?.["expected_arrival_time"]).utc()
          })
          .toSpliced(50)
          .map((d, i) => (
            <li key={i} className={configs?.["showSomeDepartureStart"] && (d?.["order_departure_point"] ?? -1) !== 1 ? "d-none" : ""}>
              <Link to={"/lines/" + d?.["line_id"]} className={"p-2 rounded bg-body-secondary monospace text-truncate d-flex align-items-center gap-2 text-decoration-none flex-wrap"}>
                <span className="fw-bold ff-inherit text-info fs-5">{d?.["line_number"]}</span>
                <span className={"ff-inherit text-body"}>
                  {
                    parseInt(d?.["direction"] ?? "-1") === 1 ? (`${Util.renderText(d?.["departure_location"] ?? "")} ⇄ ${Util.renderText(d?.["destination_location"] ?? "")}`) :
                      parseInt(d?.["direction"] ?? "-1") === 0 ? (`${Util.renderText(d?.["departure_location"] ?? "")} ⇄ ${Util.renderText(d?.["destination_location"] ?? "")}`) :
                        parseInt(d?.["direction"] ?? "-1") === 2 ? (`${Util.renderText(d?.["destination_location"] ?? "")} ⇄ ${Util.renderText(d?.["departure_location"] ?? "")}`) : ""
                  }
                </span>
                
                {configs?.["showAdditionalInfo"] && (
                  <span className="text-body-secondary ff-inherit text-sml">
                    (Partida: {moment(d?.["departure_time_trip"]).format("HH:mm")})
                  </span>
                )}
                
                <div className="ms-auto text-end text-body-secondary ff-inherit text-sml d-flex align-items-center flex-wrap gap-1">
                  <div className={"monospace"}>
                    <LiveShowItem d={{...d, i}} configs={configs} />
                  </div>
                  <span className="text-muted text-sml monospace">- às {moment(d?.["expected_arrival_time"]).format("HH:mm")}</span>
                </div>
              </Link>
            </li>
          ))
      }
    </ul>
  )
}

LiveListSingleLine.propTypes = {
  data: PropTypes.array.isRequired,
  configs: PropTypes.object
}
