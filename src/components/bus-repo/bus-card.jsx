import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const getStatusVariant = (status) => {
  switch (status) {
    case 'Em atividade': return 'success';
    case 'Em manutenção': return 'warning';
    case 'Desativado': return 'danger';
    case 'Substituído': return 'secondary';
    default: return 'light';
  }
};

export default function BusCard({ vehicle }) {
  return (
    <Card className="mb-4 shadow-sm border-0 h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0 fw-bold fs-4">
            <Link to={`/bus-repo/${vehicle.id}`} className="text-decoration-none text-dark">
              {vehicle.licensePlate}
            </Link>
          </Card.Title>
          <Badge bg={getStatusVariant(vehicle.status)} className="px-3 py-2">
            {vehicle.status}
          </Badge>
        </div>
        
        <Card.Subtitle className="mb-3 text-muted">
          Frota: <strong>{vehicle.fleetNumber}</strong> • {vehicle.company.name}
        </Card.Subtitle>

        <Row className="mb-2">
          <Col xs={12} className="text-muted small">
            <i className="bi bi-bus-front me-2"></i>
            {vehicle.chassis.manufacturer} {vehicle.chassis.model} / {vehicle.bodywork.model}
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col xs={12} className="text-muted small">
            <i className="bi bi-calendar3 me-2"></i>
            Ano/Modelo: {vehicle.manufactureYear}/{vehicle.modelYear}
          </Col>
        </Row>

        <div className="d-flex flex-wrap gap-2 mt-auto pt-2 border-top">
          {vehicle.hasAc && (
            <Badge bg="info" text="dark"><i className="bi bi-snow me-1"></i> Ar Condicionado</Badge>
          )}
          {vehicle.hasWifi && (
            <Badge bg="primary"><i className="bi bi-wifi me-1"></i> Wi-Fi</Badge>
          )}
          {vehicle.hasAirSuspension && (
            <Badge bg="secondary"><i className="bi bi-wind me-1"></i> Suspensão a Ar</Badge>
          )}
        </div>
      </Card.Body>
      <Card.Footer className="bg-white border-0 text-end">
        <Link to={`/bus-repo/${vehicle.id}`} className="btn btn-outline-primary btn-sm rounded-pill px-4">
          Ver detalhes <i className="bi bi-arrow-right ms-1"></i>
        </Link>
      </Card.Footer>
    </Card>
  );
}
