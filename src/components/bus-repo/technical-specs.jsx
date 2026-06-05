import React from 'react';
import { Card, Row, Col, ListGroup } from 'react-bootstrap';

export default function TechnicalSpecs({ vehicle }) {
  return (
    <Row className="g-4">
      <Col md={6}>
        <Card className="border-0 shadow-sm h-100">
          <Card.Header className="bg-white fw-bold"><i className="bi bi-gear-wide-connected me-2"></i> Especificações Técnicas</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item><strong>Fabricante do Chassi:</strong> {vehicle.chassis.manufacturer}</ListGroup.Item>
            <ListGroup.Item><strong>Modelo do Chassi:</strong> {vehicle.chassis.model}</ListGroup.Item>
            <ListGroup.Item><strong>Encarroçadora:</strong> {vehicle.bodywork.manufacturer}</ListGroup.Item>
            <ListGroup.Item><strong>Modelo da Carroceria:</strong> {vehicle.bodywork.model}</ListGroup.Item>
            <ListGroup.Item><strong>Dimensão:</strong> {vehicle.dimensionDescription}</ListGroup.Item>
            <ListGroup.Item><strong>Tecnologia de Otimização:</strong> {vehicle.optimizationTechnology}</ListGroup.Item>
            <ListGroup.Item><strong>Geração/Leva:</strong> {vehicle.generationBatch}</ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>

      <Col md={6}>
        <Card className="border-0 shadow-sm h-100">
          <Card.Header className="bg-white fw-bold"><i className="bi bi-universal-access me-2"></i> Conforto e Acessibilidade</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item><strong>Capacidade:</strong> Sentados: {vehicle.capacitySeated} / Em pé: {vehicle.capacityStanding}</ListGroup.Item>
            <ListGroup.Item>
              <strong>Ar Condicionado:</strong> {vehicle.hasAc ? 'Sim' : 'Não'} <br/>
              <strong>Suspensão a Ar:</strong> {vehicle.hasAirSuspension ? 'Sim' : 'Não'} <br/>
              <strong>Wi-Fi:</strong> {vehicle.hasWifi ? 'Sim' : 'Não'}
            </ListGroup.Item>
            <ListGroup.Item><strong>Tipo de Piso/Banco:</strong> {vehicle.floorType} / {vehicle.seatType}</ListGroup.Item>
            <ListGroup.Item><strong>Elevador:</strong> {vehicle.accessibilityElevator}</ListGroup.Item>
            <ListGroup.Item><strong>Bancos Exclusivos:</strong> {vehicle.accessibilityExclusiveSeats}</ListGroup.Item>
            <ListGroup.Item><strong>Contraste Visual:</strong> {vehicle.accessibilityVisualContrast}</ListGroup.Item>
            <ListGroup.Item><strong>Portas:</strong> {vehicle.doorsQuantity} ({vehicle.accessibilityDisembarkDoor})</ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}
