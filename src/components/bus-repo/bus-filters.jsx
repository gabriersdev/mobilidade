import {useEffect, useState} from 'react';
import {Col, Form, Row} from 'react-bootstrap';
import GenericCombobox from '../ui/combo-box/combo-box.jsx';

export default function BusFilters({filters, onChange}) {
  const [searchHistory, setSearchHistory] = useState([]);
  
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('busSearchHistory')) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchHistory(history.map(term => ({name: term})));
  }, []);
  
  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    onChange({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSearchChange = (value) => {
    onChange({
      ...filters,
      searchQuery: value || ''
    });
  };
  
  return (
    <div className="border-0 mb-4 p-0">
      <div>
        <Form>
          <Row className="g-3">
            <Col xs={12}>
              <Form.Group controlId="searchQuery" className="w-100">
                <GenericCombobox
                  items={searchHistory}
                  itemToString={(item) => (item ? item.name : '')}
                  onSelectedItemChange={(item) => handleSearchChange(item ? item.name : '')}
                  onInputValueChange={handleSearchChange}
                  label="Pesquisar por placa, frota ou empresa"
                  placeholder="Informe um termo ou selecione um veículo"
                  required={false}
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
