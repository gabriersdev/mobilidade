import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';

export default function BusFilters({ filters, onChange }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <Card className="border-0 shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-3"><i className="bi bi-funnel me-2"></i> Filtros de Busca</h5>
        <Form>
          <Row className="g-3">
            <Col md={12}>
              <Form.Group controlId="searchQuery">
                <Form.Control
                  type="text"
                  placeholder="Pesquisar por Placa, Frota ou Empresa..."
                  name="searchQuery"
                  value={filters.searchQuery}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="statusFilter">
                <Form.Select name="status" value={filters.status} onChange={handleChange}>
                  <option value="">Todos os Status</option>
                  <option value="Em atividade">Em atividade</option>
                  <option value="Em manutenção">Em manutenção</option>
                  <option value="Desativado">Desativado</option>
                  <option value="Substituído">Substituído</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} className="d-flex align-items-center flex-wrap gap-3">
              <Form.Check 
                type="checkbox"
                id="hasAc"
                name="hasAc"
                label="Ar Condicionado"
                checked={filters.hasAc}
                onChange={handleChange}
              />
              <Form.Check 
                type="checkbox"
                id="hasWifi"
                name="hasWifi"
                label="Wi-Fi"
                checked={filters.hasWifi}
                onChange={handleChange}
              />
              <Form.Check 
                type="checkbox"
                id="hasAirSuspension"
                name="hasAirSuspension"
                label="Suspensão a Ar"
                checked={filters.hasAirSuspension}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
