import 'react';
import {Badge, Col, Row} from 'react-bootstrap';
import Card from '../ui/card/card.jsx';
import Util from "@/lib/Util.jsx";
import {VehicleStatus} from "@/resources/bus-repo-types.ts";

const getStatusVariant = (status) => {
  switch (status) {
    case 'Em atividade':
      return 'success';
    case 'Em manutenção':
      return 'warning';
    case 'Desativado':
      return 'danger';
    case 'Substituído':
      return 'secondary';
    default:
      return 'light';
  }
};

function SpanE({children}) {
  const spanBadgeStyle = {fontSize: "0.75rem"};
  const spanBadgeClassNames = "";
  return <span style={spanBadgeStyle} className={spanBadgeClassNames}>{children}</span>
}

export default function BusCard({vehicle}) {
  return (
    <Card
      title={`${vehicle.licensePlate}`}
      link={`/bus-repo/${vehicle.id}`}
      badge={
        <Badge pill bg={getStatusVariant(VehicleStatus[vehicle.status])} className="text-sml">
          <SpanE>{VehicleStatus[vehicle.status]}</SpanE>
        </Badge>
      }
      subtitle={`Carro ${vehicle.fleetNumber} - ${vehicle.company.name}`}
    >
      <Row className="mb-1">
        <Col xs={12} className="text-body text-sml line-clamp-1">
          {/*<i className="bi bi-bus-front me-2"></i>*/}
          {Util.renderText(`${vehicle.bodywork.model} - ${vehicle.chassis.manufacturer} - ${vehicle.chassis.model}`)}
        </Col>
      </Row>
      
      <Row className="">
        <Col xs={12} className="text-body text-sml line-clamp-1">
          {/*<i className="bi bi-calendar3 me-2"></i>*/}
          {Util.renderText(`Ano/Modelo: ${vehicle.manufactureYear}/${vehicle.modelYear}`)}
        </Col>
      </Row>
      
      <div className={"d-flex flex-wrap gap-1 mt-auto flex-nowrap overflow-x-scroll " + (vehicle.hasAc || vehicle.hasWifi || vehicle.hasAirSuspension ? "mt-3" : "")}>
        {vehicle.hasAc && (
          <Badge bg="info" pill text="light">
            <div className='text-sml d-flex align-items-center justify-content-center'>
              <i className="bi bi-snow me-1 text-sml"></i> <SpanE>Ar Condicionado</SpanE>
            </div>
          </Badge>
        )}
        
        {vehicle.hasWifi && (
          <Badge bg="primary" pill text={"light"}>
            <div className='text-sml d-flex align-items-center justify-content-center'>
              <i className="bi bi-wifi me-1 text-sml"></i> <SpanE>Wi-Fi</SpanE>
            </div>
          </Badge>
        )}
        
        {vehicle.hasAirSuspension && (
          <Badge bg="secondary" pill>
            <div className='text-sml d-flex align-items-center justify-content-center'>
              <i className="bi bi-arrow-up-right-circle-fill me-1 text-sml"></i> <SpanE>Suspensão a Ar</SpanE>
            </div>
          </Badge>
        )}
      </div>
    </Card>
  );
}
