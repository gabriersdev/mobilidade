import moment from "moment";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {useCallback, useRef} from "react";

import Title from "../ui/title/title.jsx";
import Util from "../../assets/Util.jsx";
import LiveShowItem from "./live-show-item.jsx";

moment.locale("pt-BR");

export default function LiveListResults({data, dataNextDepartureTimes, configs}) {
  const nextDepartureTimes = useRef(dataNextDepartureTimes);
  
  const filtered = useCallback((d, i, self) => {
    return i === self.findIndex(other =>
      other.line_number === d.line_number &&
      other.departure_time_trip === d.departure_time_trip
    );
  }, []);
  
  const getNextDepartureTimes = useCallback((lineId, expectedArrivalTime, departureTimeTrip) => {
    if (nextDepartureTimes.current && lineId) {
      return nextDepartureTimes.current.filter(d => {
        const lineItemExpectedArrivalTimeM = moment(expectedArrivalTime);
        const lineItemDepartureTimeTripM = moment(departureTimeTrip);
        const departureExpectedArrivalTimeM = moment(d?.["expected_arrival_time"]);
        return (
          d?.["line_id"].toString() === lineId.toString()
          && departureExpectedArrivalTimeM.toDate().getTime() > lineItemExpectedArrivalTimeM.toDate().getTime()
          && (![0, 1].includes(d?.["prediction_line_order"] ? lineItemDepartureTimeTripM.diff(lineItemExpectedArrivalTimeM, "seconds") > 60 : true))
        );
      }).toSpliced(3);
    }
    return [];
  }, [nextDepartureTimes]);
  
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
              // TODO - separar em um componente a parte
              <li className={configs?.["showSomeDepartureStart"] && (d?.["order_departure_point"] ?? -1) !== 1 ? "d-none" : ""} key={i}>
                <table className="table table-responsive">
                  <tbody>
                  <tr className={"bg-body-secondary"}>
                    <td className={"bg-body-secondary"} style={{width: ((3 * 32) + 16) + "px", verticalAlign: "top"}}>
                      <Link to={`/lines/${d?.["line_id"] ?? ""}`} className={"text-decoration-none"}>
                        <Title type="h3" classX=" fs-1 text-primary fw-bold m-0 p-0 line-clamp-1">
                          {d?.["line_number"] ?? "Linha"}
                        </Title>
                      </Link>
                    </td>
                    <td className={"bg-body-secondary"} style={{verticalAlign: "top"}}>
                      <Link to={`/lines/${d?.["line_id"] ?? ""}`} className={"text-decoration-none d-flex align-items-center justify-content-start"}>
                        <Title type={"h3"} classX=" text-primary fs-3 fw-medium inter m-0 p-0 d-flex flex-column gap-1">
                          {
                            parseInt(d?.["direction"] ?? "-1") === 1 ? (`${Util.renderText(d?.["departure_location"] ?? "")} -> ${Util.renderText(d?.["destination_location"] ?? "")}`) :
                              parseInt(d?.["direction"] ?? "-1") === 0 ? (`${Util.renderText(d?.["departure_location"] ?? "")} ⇄ ${Util.renderText(d?.["destination_location"] ?? "")}`) :
                                parseInt(d?.["direction"] ?? "-1") === 2 ? (`${Util.renderText(d?.["destination_location"] ?? "")} -> ${Util.renderText(d?.["departure_location"] ?? "")}`) : ""
                          }
                          <span>
                            {
                              configs?.["showAdditionalInfo"] && (
                                <span className={"fs-initial fw-normal d-flex flex-wrap gap-1 opacity-75"}>
                                  <i className={"fst-normal fw-normal text-sml"}>Sentido {Util.directionToText(d?.["direction"] ?? -1)?.toLowerCase()}.</i>
                                  <i className={"fst-normal fw-normal text-sml"}>Partida às {moment(d?.["departure_time_trip"]).format("HH:mm")}.</i>
                                </span>
                              )
                            }
                          </span>
                        </Title>
                        <span className={"d-none text-sml opacity-50"}>({d?.["departure_time_trip"]}) | ({d?.["expected_arrival_time"]})</span>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className={"bg-body-secondary"} colSpan={2}>
                      <div className={"d-flex align-items-center flex-wrap gap-1"}>
                        <LiveShowItem d={{...d, i}} configs={configs}/>
                        <span className={"text-muted text-sml"}>- às {moment(d?.["expected_arrival_time"]).format("HH:mm")}</span>
                      </div>
                      {
                        // TODO - separar em um componente a parte
                        configs?.["showAdditionalInfo"] && (
                          <div className={""}>
                            <p className={"text-sml m-0 d-inline-flex align-items-center gap-1 flex-wrap lh-base"}>
                              <span className={"text-muted"}>
                                <svg className={"d-none d-sm-inline-block"} style={{rotate: "180deg", marginRight: "0.125rem"}} xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#BBBBBB">
                                  <path d="M860-240 500-480l360-240v480Zm-400 0L100-480l360-240v480Zm-80-240Zm400 0Zm-400 90v-180l-136 90 136 90Zm400 0v-180l-136 90 136 90Z"/>
                                </svg>
                                <i className={"fst-normal"}>
                                  Depois - aproxima ou saí
                                </i>
                              </span>
                              <>
                                {
                                  getNextDepartureTimes(
                                    d?.["line_id"] ?? 0,
                                    d?.["expected_arrival_time"],
                                    d?.["departure_time_trip"],
                                  )?.map((_, u, self) => {
                                    return (
                                      // TODO - separar em um componente a parte
                                      (u === 0) && (
                                        <span className={"m-0 text-muted d-flex align-items-center flex-wrap gap-1"} key={u}>
                                          {
                                            self.map((q, j, self) => {
                                              return (
                                                <i className={"fst-normal"} key={j}>
                                                  {j === (self.length - 1) && j !== 0 && "e "}
                                                  {
                                                    Util.diffToHuman(q?.["expected_arrival_time"]).match(/\w*\s\d{2}\s\w*/) ? (
                                                      <>
                                                        {Util.diffToHuman(q?.["expected_arrival_time"])}
                                                        {" - às "}
                                                      </>
                                                    ) : "às "
                                                  }
                                                  {
                                                    Util.renderText(moment(q?.["expected_arrival_time"])?.format("HH:mm"))
                                                    //{" "} (Saiu às {Util.renderText(moment(q?.["departure_time_trip"])?.format("HH:mm"))})
                                                  }
                                                  {j === (self.length - 1) && "."}
                                                  {(j !== (self.length - 1) && (j === 0 && (self.length - 1) !== 0)) && ","}
                                                </i>
                                              )
                                            })
                                          }
                                        </span>
                                      )
                                    )
                                  })
                                }
                                {
                                  !getNextDepartureTimes(
                                    d?.["line_id"] ?? 0,
                                    d?.["expected_arrival_time"],
                                    d?.["departure_time_trip"],
                                  ).length && (
                                    <>amanhã ou no próximo dia útil.
                                      <Link to={`/lines/${d?.["line_id"] ?? ""}`} className={"text-primary"}>
                                        Consulte
                                        <svg style={{marginLeft: "0.125rem"}} xmlns="http://www.w3.org/2000/svg" height="13px" viewBox="0 -960 960 960" width="13px" fill={"#2FA4E7"}>
                                          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
                                        </svg>
                                      </Link>
                                    </>
                                  )
                                }
                              </>
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
  dataNextDepartureTimes: PropTypes.array.isRequired,
  configs: PropTypes.object.isRequired,
}
