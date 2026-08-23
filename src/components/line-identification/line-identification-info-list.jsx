import {Link} from "react-router-dom";
import InfoItem from "@/components/ui/info-item/info-item.jsx";
import PropTypes from "prop-types";
import InfoPopover from "@/components/ui/info-popover/info-popover.jsx";

const LineIdentificationInfoList = ({
  lineType, scope, integrationPopover, hasIntegration,
  accessibility, accessibilityPopover, comfortPopover,
  fare, line, countDepartureTimes
}) => {
  const getSearchTerm = () => {
    const l = lineType.toLowerCase();
    if (l.includes("executivo")) return "Executivo";
    if (l.includes("seletivo")) return "Bandeirante";
    if (l.includes("coletivo")) return "Coletivo";
    return lineType;
  };

  return (
    <div className="d-flex align-items-center gap-3 flex-wrap order-1" style={{maxWidth: "600px"}}>
      <Link className={"text-decoration-none"} to={"/search/?term=" + getSearchTerm()}>
        <InfoItem value={lineType}><i className="bi bi-record-circle red"></i></InfoItem>
      </Link>
      
      <Link className={"text-decoration-none"} to={"/search/?term=" + scope}>
        <InfoItem value={scope}><i className="bi bi-building red"></i></InfoItem>
      </Link>
      
      <InfoPopover overlay={integrationPopover}>
        <InfoItem value={hasIntegration}><i className="bi bi-train-front-fill purple"></i></InfoItem>
      </InfoPopover>
      
      {accessibility === 1 && (
        <InfoPopover overlay={accessibilityPopover}>
          <i className="bi bi-person-wheelchair text-warning"></i>
          <span className="text-body fw-medium">Acessibilidade</span>
        </InfoPopover>
      )}
      
      <InfoPopover overlay={comfortPopover}>
        <i className="bi bi-star-fill text-primary"></i>
        <span className="text-body fw-medium">Conforto</span>
      </InfoPopover>
      
      <InfoItem label="Tarifa" value={fare}>
        <i className="bi bi-cash-coin naval-blue"></i>
      </InfoItem>
      
      <Link to={`/company/${line.company_id}`} className={"text-decoration-none"}>
        <InfoItem value={line.company_name}><i className="bi bi-buildings green-sheets"></i></InfoItem>
      </Link>
      
      <div className={"d-none"}>
        <Link className={"text-decoration-none text-body"} to={"#partidas"}>
          <InfoItem>
            <div className="d-flex align-items-center gap-1">
              <i className="bi bi-calendar-date d-inline-block"></i>
              <span className="text-body fw-medium ms-1">
              {countDepartureTimes > 0 ? countDepartureTimes.toLocaleString() : "Nenhuma"} {countDepartureTimes > 1 ? "partidas" : "partida"} nos quadros de horários durante a semana
            </span>
            </div>
          </InfoItem>
        </Link>
      </div>
    </div>
  );
};

LineIdentificationInfoList.propTypes = {
  lineType: PropTypes.string, scope: PropTypes.string,
  integrationPopover: PropTypes.object, hasIntegration: PropTypes.string,
  accessibility: PropTypes.number, accessibilityPopover: PropTypes.object,
  comfortPopover: PropTypes.object, fare: PropTypes.string,
  line: PropTypes.object, countDepartureTimes: PropTypes.number,
}

export default LineIdentificationInfoList;
