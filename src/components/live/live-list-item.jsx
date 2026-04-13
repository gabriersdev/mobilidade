import moment from "moment";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import Title from "../ui/title/title.jsx";
import Util from "../../assets/Util.jsx";
import LiveShowItem from "./live-show-item.jsx";

const NextDeparture = ({times, lineId}) => {
  if (!times.length) {
    return (
      <>
        amanhã ou no próximo dia útil.
        <Link to={`/lines/${lineId ?? ""}`} className={"text-primary"}>
          Consulte
          <svg style={{marginLeft: "0.125rem"}} xmlns="http://www.w3.org/2000/svg" height="13px" viewBox="0 -960 960 960" width="13px" fill={"#2FA4E7"}>
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/>
          </svg>
        </Link>
      </>
    );
  }
  
  return (
    <span className={"m-0 text-muted d-flex align-items-center flex-wrap gap-1"}>
      {times.map((q, j, self) => (
        <i className={"fst-normal"} key={j}>
          {j === self.length - 1 && j !== 0 && "e "}
          {Util.diffToHuman(q?.["expected_arrival_time"]).match(/\w*\s\d{2}\s\w*/) ? (
            <>{Util.diffToHuman(q?.["expected_arrival_time"])} {" - às "}</>
          ) : "às "}
          {Util.renderText(moment(q?.["expected_arrival_time"])?.format("HH:mm"))}
          {j === self.length - 1 && "."}
          {j !== self.length - 1 && j === 0 && self.length - 1 !== 0 && ","}
        </i>
      ))}
    </span>
  );
};

NextDeparture.propTypes = {
  times: PropTypes.array.isRequired,
  lineId: PropTypes.string,
};


const LiveListItem = ({d, i, configs, getNextDepartureTimes}) => {
  const nextTimes = getNextDepartureTimes(d?.["line_id"], d?.["expected_arrival_time"], d?.["departure_time_trip"]);
  
  return (
    <li className={configs?.["showSomeDepartureStart"] && (d?.["order_departure_point"] ?? -1) !== 1 ? "d-none" : ""}>
      <table className="table table-responsive">
        <tbody>
        <tr className={"bg-body-secondary"}>
          <td className={"bg-body-secondary"} style={{width: `${3 * 32 + 16}px`, verticalAlign: "top"}}>
            <Link to={`/lines/${d?.["line_id"] ?? ""}`} className={"text-decoration-none"}>
              <Title type="h3" classX=" fs-1 text-primary fw-bold m-0 p-0 line-clamp-1">
                {d?.["line_number"] ?? "Linha"}
              </Title>
            </Link>
          </td>
          <td className={"bg-body-secondary"} style={{verticalAlign: "top"}}>
            <Link to={`/lines/${d?.["line_id"] ?? ""}`} className={"text-decoration-none d-flex align-items-center justify-content-start"}>
              <div className={"d-flex gap-2"}>
                <Title type={"h3"} classX=" text-primary fs-3 fw-medium inter m-0 p-0 d-flex flex-column gap-1">
                  {
                    parseInt(d?.["direction"] ?? "-1") === 1 ? (`${Util.renderText(d?.["departure_location"] ?? "")} ⇄ ${Util.renderText(d?.["destination_location"] ?? "")}`) :
                      parseInt(d?.["direction"] ?? "-1") === 0 ? (`${Util.renderText(d?.["departure_location"] ?? "")} ⇄ ${Util.renderText(d?.["destination_location"] ?? "")}`) :
                        parseInt(d?.["direction"] ?? "-1") === 2 ? (`${Util.renderText(d?.["destination_location"] ?? "")} ⇄ ${Util.renderText(d?.["departure_location"] ?? "")}`) : ""
                  }
                  <span>
                      {configs?.["showAdditionalInfo"] && (
                        <span className={"fs-initial d-flex flex-wrap gap-1 opacity-75"}>
                          <i className={"fst-normal text-sml"}>Sentido {Util.directionToText(d?.["direction"] ?? -1)?.toLowerCase()}.</i>
                          <i className={"fst-normal text-sml"}>Partida às {moment(d?.["departure_time_trip"]).format("HH:mm")}.</i>
                        </span>
                      )}
                    </span>
                </Title>
                <div className={"d-flex align-items-start justify-content-center gap-1 mt-1"}>
                  {configs?.["showAdditionalInfo"] && Util.getTodayHolidayData() && (
                    <OverlayTrigger overlay={<Tooltip><p className={"m-0 p-0 text-sml text-balance line-clamp-3"}>A linha está operando no horário de domingo e feriado. O horário possui observações.</p></Tooltip>}>
                      <i className="bi bi-exclamation-circle-fill text-"></i>
                    </OverlayTrigger>
                  )}
                  <OverlayTrigger overlay={<Tooltip><p className={"m-0 p-0 text-sml text-balance line-clamp-3"}>Somente desembarque. Linhas encerrando viagem.</p></Tooltip>}>
                    <i className="bi bi-arrow-down-left-circle-fill d-none"></i>
                  </OverlayTrigger>
                  <OverlayTrigger overlay={<Tooltip><p className={"m-0 p-0 text-sml text-balance line-clamp-3"}>Linhas partindo. Somente embarque.</p></Tooltip>}>
                    <i className="bi bi-arrow-up-right-circle-fill d-none"></i>
                  </OverlayTrigger>
                </div>
              </div>
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
            {configs?.["showAdditionalInfo"] && (
              <div className={""}>
                <p className={"text-sml m-0 d-inline-flex align-items-center gap-1 flex-wrap lh-base"}>
                    <span className={"text-muted"}>
                      <svg className={"d-none d-sm-inline-block"} style={{rotate: "180deg", marginRight: "0.125rem"}} xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#BBBBBB">
                        <path d="M860-240 500-480l360-240v480Zm-400 0L100-480l360-240v480Zm-80-240Zm400 0Zm-400 90v-180l-136 90 136 90Zm400 0v-180l-136 90 136 90Z"/>
                      </svg>
                      <i className={"fst-normal"}>Depois - aproxima ou saí</i>
                    </span>
                  <NextDeparture times={nextTimes} lineId={d?.["line_id"]}/>
                </p>
              </div>
            )}
          </td>
        </tr>
        </tbody>
      </table>
    </li>
  );
};

LiveListItem.propTypes = {
  d: PropTypes.object.isRequired,
  i: PropTypes.number.isRequired,
  configs: PropTypes.object.isRequired,
  getNextDepartureTimes: PropTypes.func.isRequired,
};

export default LiveListItem;
