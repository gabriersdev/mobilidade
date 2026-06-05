import React from 'react';
import {Col, Form, Row} from 'react-bootstrap';

export default function BusFilters({filters, onChange}) {
  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    onChange({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  return (
    <div className="border-0 mb-4 p-0">
      <div>
        <Form>
          <Row className="g-3">
            <Col>
              <Form.Group controlId="searchQuery">
                {/*TODO: utilizar combobox, tal qual no componente de formulário da página de live*/}
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
      </div>
    </div>
  );
}
