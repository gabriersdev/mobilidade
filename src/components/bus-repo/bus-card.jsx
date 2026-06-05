import 'react';
import {Badge, Col, Row} from 'react-bootstrap';
import Card from '../ui/card/card.jsx';
import Util from "@/lib/Util.jsx";

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

export default function BusCard({vehicle}) {
  return (
    <Card
      title={`${vehicle.licensePlate}`}
      link={`/bus-repo/${vehicle.id}`}
      badge={
        <Badge pill bg={getStatusVariant(vehicle.status)} className="text-sml">
          {vehicle.status}
        </Badge>
      }
      subtitle={`Carro ${vehicle.fleetNumber} - ${vehicle.company.name}`}
    >
      <Row className="mb-1">
        <Col xs={12} className="text-body small line-clamp-1">
          {/*<i className="bi bi-bus-front me-2"></i>*/}
          {Util.renderText(`${vehicle.bodywork.model} - ${vehicle.chassis.manufacturer} - ${vehicle.chassis.model}`)}
        </Col>
      </Row>
      
      <Row className="mb-3">
        <Col xs={12} className="text-body small line-clamp-1">
          {/*<i className="bi bi-calendar3 me-2"></i>*/}
          {Util.renderText(`Ano/Modelo: ${vehicle.manufactureYear}/${vehicle.modelYear}`)}
        </Col>
      </Row>
      
      <div className="d-flex flex-wrap gap-1 mt-auto">
        {vehicle.hasAc && (
          <Badge bg="info" pill text="light">
            <div className='text-sml d-flex align-items-center justify-content-center'>
              <i className="bi bi-snow me-1"></i> <span className={""}>Ar Condicionado</span>
            </div>
          </Badge>
        )}
        {vehicle.hasWifi && (
          <Badge bg="primary" pill text={"light"}>
            <div className='text-sml d-flex align-items-center justify-content-center'>
              <i className="bi bi-wifi me-1"></i> <span>Wi-Fi</span>
            </div>
          </Badge>
        )}
        {vehicle.hasAirSuspension && (
          <Badge bg="secondary" pill>
            <div className='text-sml d-flex align-items-center justify-content-center'>
              <i className="bi bi-arrow-up-right-circle-fill me-1"></i> <span>Suspensão a Ar</span>
            </div>
          </Badge>
        )}
      </div>
    </Card>
  );
}
