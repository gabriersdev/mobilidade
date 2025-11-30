import moment from "moment";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {useCallback} from "react";

import Title from "../ui/title/title.jsx";
import Util from "../../assets/Util.jsx";
import LiveShowItem from "./live-show-item.jsx";

moment.locale("pt-BR");

export default function LiveListResults({data, configs}) {
  const filtered = useCallback((d, i, self) => {
    return i === self.findIndex(other =>
      other.line_number === d.line_number &&
      other.departure_time_trip === d.departure_time_trip
    );
  }, []);
  
  return (
    <ul style={{listStyleType: "none"}} className={"m-0 p-0"}>
      {
        data.filter(filtered)
          .toSorted((a, b) => {
            return moment(a?.["expected_arrival_time"]).utc() > moment(b?.["expected_arrival_time"]).utc()
          })
          .toSpliced(50)
          .map((d, i) => {
            return (
              <li className={configs?.["showSomeDepartureStart"] && (d?.["order_departure_point"] ?? -1) !== 1 ? "d-none" : ""} key={i}>
                <table className="table table-responsive">
                  <tbody>
                  <tr className={"bg-body-secondary"}>
                    <td className={"bg-body-secondary"} style={{width: ((3 * 32) + 16) + "px"}}>
                      <Link to={`/lines/${d?.["line_id"] ?? ""}`} className={"text-decoration-none"}>
                        <Title type="h3" classX=" fs-1 text-primary fw-bold m-0 p-0 line-clamp-1">
                          {d?.["line_number"] ?? "Linha"}
                        </Title>
                      </Link>
                    </td>
                    <td className={"bg-body-secondary"} style={{verticalAlign: "middle"}}>
                      <Link to={`/lines/${d?.["line_id"] ?? ""}`} className={"text-decoration-none d-flex align-items-center justify-content-start"}>
                        <Title type={"h3"} classX=" text-primary fs-3 fw-medium inter m-0 p-0 d-flex flex-wrap gap-1 align-items-center">
                          {
                            parseInt(d?.["direction"] ?? "-1") === 1 ? (`${Util.renderText(d?.["departure_location"] ?? "")} -> ${Util.renderText(d?.["destination_location"] ?? "")}`) :
                              parseInt(d?.["direction"] ?? "-1") === 0 ? (`${Util.renderText(d?.["departure_location"] ?? "")} ⇄ ${Util.renderText(d?.["destination_location"] ?? "")}`) :
                                parseInt(d?.["direction"] ?? "-1") === 2 ? (`${Util.renderText(d?.["destination_location"] ?? "")} -> ${Util.renderText(d?.["departure_location"] ?? "")}`) : ""
                          }
                          <span>
                            {
                              configs?.["showAdditionalInfo"] && (
                                <span className={"text-sml fs-initial fw-normal"}>- partida às {moment(d?.["departure_time_trip"]).format("HH:mm")}</span>
                              )
                            }
                          </span>
                        </Title>
                        <span className={"d-none text-sml opacity-50"}>({d?.["departure_time_trip"]}) | ({d?.["expected_arrival_time"]})</span>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className={"bg-body-secondary"}>
                      {Util.directionToText(d?.["direction"] ?? -1)}
                    </td>
                    <td className={"bg-body-secondary"}>
                      <div className={"d-flex align-items-center flex-wrap gap-1"}>
                        <LiveShowItem d={d} configs={configs}/>
                        <span className={"text-muted text-sml"}>- às {moment(d?.["expected_arrival_time"]).format("HH:mm")}</span>
                      </div>
                      {
                        configs?.["showAdditionalInfo"] && (
                          <div className={"d-none"}>
                            <p className={"text-sml m-0 d-inline-flex align-items-center gap-1 flex-wrap"}>
                              <span className={"text-muted"}>
                                <svg style={{rotate: "180deg", marginRight: "0.125rem"}} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#BBBBBB">
                                  <path d="M860-240 500-480l360-240v480Zm-400 0L100-480l360-240v480Zm-80-240Zm400 0Zm-400 90v-180l-136 90 136 90Zm400 0v-180l-136 90 136 90Z"/>
                                </svg>
                                Depois:
                              </span>
                              <span className={"m-0 text-muted"}>
                                <span>amanhã às 15h00, 17h00 e 19h00.</span>
                              </span>
                            </p>
                          </div>
                        )
                      }
                    </td>
                  </tr>
                  </tbody>
                </table>
              </li>
            )
          })
      }
    </ul>
  )
}

LiveListResults.propTypes = {
  data: PropTypes.array.isRequired,
  configs: PropTypes.object.isRequired,
}
