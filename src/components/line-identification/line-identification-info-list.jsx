import {Link} from "react-router-dom";
import {OverlayTrigger} from "react-bootstrap";
import InfoItem from "@/components/ui/info-item/info-item.jsx";
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
        <InfoItem value={lineType}>
          <i className="bi bi-record-circle red"></i>
        </InfoItem>
      </Link>
      <Link className={"text-decoration-none"} to={"/search/?term=" + scope}>
        <InfoItem value={scope}>
          <i className="bi bi-building red"></i>
        </InfoItem>
      </Link>
      
      <OverlayTrigger trigger="click" placement="auto" overlay={integrationPopover}>
        <div className={"d-flex align-items-center flex-wrap gap-1 cursor-pointer"}>
          <InfoItem value={hasIntegration}>
            <i className="bi bi-train-front-fill purple"></i>
          </InfoItem>
          <span className="text-body-tertiary bg-body-secondary rounded-circle text-sml font-monospace " style={{padding: "1px 0.5rem"}}>i</span>
        </div>
      </OverlayTrigger>
      
      {
        accessibility === 1 && (
          <OverlayTrigger trigger="click" placement="auto" overlay={accessibilityPopover}>
            <div className={"d-flex align-items-center flex-wrap gap-1 cursor-pointer"}>
              <i className="bi bi-person-wheelchair text-warning"></i>
              <span className="text-body fw-medium">Acessibilidade</span>
              <span className="text-body-tertiary bg-body-secondary rounded-circle text-sml font-monospace " style={{padding: "1px 0.5rem"}}>i</span>
            </div>
          </OverlayTrigger>
        )
      }
      
      <OverlayTrigger trigger="click" placement="auto" overlay={comfortPopover}>
        <div className={"d-flex align-items-center flex-wrap gap-1 cursor-pointer"}>
          <i className="bi bi-star-fill text-primary"></i>
          <span className="text-body fw-medium">Conforto</span>
          <span className="text-body-tertiary bg-body-secondary rounded-circle text-sml font-monospace " style={{padding: "1px 0.5rem"}}>i</span>
        </div>
      </OverlayTrigger>
      
      <InfoItem label="Tarifa" value={fare}>
        <i className="bi bi-cash-coin naval-blue"></i>
      </InfoItem>
      
      <Link to={`/company/${line.company_id}`} className={"text-decoration-none"}>
        <InfoItem value={line.company_name}>
          <i className="bi bi-buildings green-sheets"></i>
        </InfoItem>
      </Link>
      
      <Link className={"text-decoration-none text-body"} to={"#partidas"}>
        <InfoItem>
          <div className="d-flex align-items-center gap-1">
            <i className="bi bi-calendar-date d-inline-block"></i>
            <span className="text-body fw-medium ms-1">
              {countDepartureTimes > 0 ? countDepartureTimes.toLocaleString() : "Nenhuma"}{" "}
              {countDepartureTimes > 1 ? "partidas" : "partida"} durante a semana
            </span>
          </div>
        </InfoItem>
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
