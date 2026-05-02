import {Link} from "react-router-dom";
import {OverlayTrigger} from "react-bootstrap";
import LineInfo from "../line-info/line-info.jsx";
import PropTypes from "prop-types";

const LineIdentificationInfoList = ({
                                      lineType,
                                      scope,
                                      integrationPopover,
                                      hasIntegration,
                                      accessibility,
                                      accessibilityPopover,
                                      comfortPopover,
                                      fare,
                                      line,
                                      countDepartureTimes
                                    }) => {
  return (
    <div className="d-flex align-items-center gap-3 flex-wrap order-1" style={{maxWidth: "600px"}}>
      <Link className={"text-decoration-none"} to={"/search/?term=" + (
        lineType.toLowerCase().includes("executivo") ? "Executivo" : lineType.toLowerCase().includes("seletivo") ? "Bandeirante" :
          lineType.toLowerCase().includes("coletivo") ? "Coletivo" : lineType
      )}>
        <LineInfo label={{ref: 'Tipo da Linha', value: lineType}}>
          <i className="bi bi-record-circle red"></i>
        </LineInfo>
      </Link>
      <Link className={"text-decoration-none"} to={"/search/?term=" + scope}>
        <LineInfo label={{ref: 'Grupo de atendimento', value: scope}}>
          <i className="bi bi-building red"></i>
        </LineInfo>
      </Link>
      
      <OverlayTrigger trigger="click" placement="auto" overlay={integrationPopover}>
        <div className={"d-flex align-items-center flex-wrap gap-1 cursor-pointer"}>
          <LineInfo label={{ref: 'Integração com outras Linhas ou Modais', value: hasIntegration}}>
            <i className="bi bi-train-front-fill purple"></i>
          </LineInfo>
          <span className="text-body-tertiary bg-body-secondary rounded-circle text-sml font-monospace " style={{padding: "1px 0.5rem"}}>i</span>
        </div>
      </OverlayTrigger>
      
      {
        accessibility === 1 && (
          <OverlayTrigger trigger="click" placement="auto" overlay={accessibilityPopover}>
            <div className={"d-flex align-items-center flex-wrap gap-1 cursor-pointer"}>
              <i className="bi bi-person-wheelchair text-warning"></i>
              Acessibilidade
              <span className="text-body-tertiary bg-body-secondary rounded-circle text-sml font-monospace " style={{padding: "1px 0.5rem"}}>i</span>
            </div>
          </OverlayTrigger>
        )
      }
      
      <OverlayTrigger trigger="click" placement="auto" overlay={comfortPopover}>
        <div className={"d-flex align-items-center flex-wrap gap-1 cursor-pointer"}>
          <i className="bi bi-star-fill text-primary"></i>
          Conforto
          <span className="text-body-tertiary bg-body-secondary rounded-circle text-sml font-monospace " style={{padding: "1px 0.5rem"}}>i</span>
        </div>
      </OverlayTrigger>
      
      <LineInfo label={{ref: 'Tarifa', value: fare}}>
        <i className="bi bi-cash-coin naval-blue"></i>
      </LineInfo>
      <Link to={`/company/${line.company_id}`} className={"text-decoration-none"}>
        <LineInfo label={{ref: 'Companhia', value: line.company_name}}>
          <i className="bi bi-buildings green-sheets"></i>
        </LineInfo>
      </Link>
      <Link className={"text-decoration-none text-body"} to={"#partidas"}>
        <LineInfo label={{ref: "Horários", value: ""}}>
          <i className="bi bi-calendar-date d-inline-block"></i>
          <span className={"ms-2"}>{countDepartureTimes.toLocaleString() || "Nenhuma"} {countDepartureTimes > 1 ? "partidas" : "partida"}</span>
        </LineInfo>
      </Link>
    </div>
  );
};

LineIdentificationInfoList.propTypes = {
  lineType: PropTypes.string,
  scope: PropTypes.string,
  integrationPopover: PropTypes.object,
  hasIntegration: PropTypes.string,
  accessibility: PropTypes.number,
  accessibilityPopover: PropTypes.object,
  comfortPopover: PropTypes.object,
  fare: PropTypes.string,
  line: PropTypes.object,
  countDepartureTimes: PropTypes.number,
}

export default LineIdentificationInfoList;
