import React from 'react';
import {Row, Col, Table} from 'react-bootstrap';
import Title from '@/components/ui/title/title.jsx';

export default function TechnicalSpecs({vehicle}) {
  return (
    <section>
      <Title type="h2" title="Especificações e Conforto" classX="text-body-secondary mb-4" />
      <Row className="g-5 align-items-stretch">
        <Col md={6} id="especificacoes-tecnicas">
          <div className="d-flex flex-column gap-3">
            <Title type="h3" title="Especificações Técnicas" classX="text-body" />
            <Table responsive className="mb-0 table-borderless table-striped-columns" size="sm">
              <tbody>
                <tr><th className="text-body-secondary w-50 fw-medium">Fabricante do Chassi</th><td>{vehicle.chassis.manufacturer}</td></tr>
                <tr><th className="text-body-secondary fw-medium">Modelo do Chassi</th><td>{vehicle.chassis.model}</td></tr>
                <tr><th className="text-body-secondary fw-medium">Encarroçadora</th><td>{vehicle.bodywork.manufacturer}</td></tr>
                <tr><th className="text-body-secondary fw-medium">Modelo da Carroceria</th><td>{vehicle.bodywork.model}</td></tr>
                <tr><th className="text-body-secondary fw-medium">Dimensão</th><td>{vehicle.dimensionDescription}</td></tr>
                <tr><th className="text-body-secondary fw-medium">Tecnologia de Otimização</th><td>{vehicle.optimizationTechnology}</td></tr>
                <tr><th className="text-body-secondary fw-medium">Geração/Leva</th><td>{vehicle.generationBatch}</td></tr>
              </tbody>
            </Table>
          </div>
        </Col>

        <Col md={6} id="conforto-e-acessibilidade">
          <div className="d-flex flex-column gap-3">
            <Title type="h3" title="Conforto e Acessibilidade" classX="text-body" />
            <Table responsive className="mb-0 table-borderless table-striped-columns" size="sm">
              <tbody>
                <tr><th className="text-body-secondary w-50 fw-medium">Capacidade (Sentados)</th><td>{vehicle.capacitySeated}</td></tr>
                <tr><th className="text-body-secondary fw-medium">Capacidade (Em pé)</th><td>{vehicle.capacityStanding}</td></tr>
                <tr><th className="text-body-secondary fw-medium">Ar Condicionado</th><td>{vehicle.hasAc ? 'Sim' : 'Não'}</td></tr>
                <tr><th className="text-body-secondary fw-medium">Suspensão a Ar</th><td>{vehicle.hasAirSuspension ? 'Sim' : 'Não'}</td></tr>
                <tr><th className="text-body-secondary fw-medium">Wi-Fi</th><td>{vehicle.hasWifi ? 'Sim' : 'Não'}</td></tr>
                <tr><th className="text-body-secondary fw-medium">Tipo de Piso</th><td>{vehicle.floorType}</td></tr>
                <tr><th className="text-body-secondary fw-medium">Tipo de Banco</th><td>{vehicle.seatType}</td></tr>
                <tr><th className="text-body-secondary fw-medium">Elevador</th><td>{vehicle.accessibilityElevator}</td></tr>
                <tr><th className="text-body-secondary fw-medium">Bancos Exclusivos</th><td>{vehicle.accessibilityExclusiveSeats}</td></tr>
                <tr><th className="text-body-secondary fw-medium">Contraste Visual</th><td>{vehicle.accessibilityVisualContrast}</td></tr>
                <tr><th className="text-body-secondary fw-medium">Portas</th><td>{vehicle.doorsQuantity} ({vehicle.accessibilityDisembarkDoor})</td></tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </section>
  );
}
