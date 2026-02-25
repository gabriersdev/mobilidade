import PropTypes from "prop-types";
import { Form, Row, Col } from "react-bootstrap";

const LineFilters = ({ filters, onFilterChange, companies, lineTypes }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <Row className="mb-3">
      <Col md={3}>
        <Form.Group controlId="sortOrder">
          <Form.Label>Ordenar por</Form.Label>
          <Form.Control
            as="select"
            name="sortOrder"
            value={filters.sortOrder}
            onChange={handleInputChange}
          >
            <option value="number_asc">Número (crescente)</option>
            <option value="number_desc">Número (decrescente)</option>
            <option value="fare_asc">Tarifa (crescente)</option>
            <option value="fare_desc">Tarifa (decrescente)</option>
          </Form.Control>
        </Form.Group>
      </Col>
      <Col md={3}>
        <Form.Group controlId="lineType">
          <Form.Label>Tipo de Linha</Form.Label>
          <Form.Control
            as="select"
            name="lineType"
            value={filters.lineType}
            onChange={handleInputChange}
          >
            <option value="">Todos</option>
            {lineTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
      <Col md={3}>
        <Form.Group controlId="isMetropolitan">
          <Form.Label>Região</Form.Label>
          <Form.Control
            as="select"
            name="isMetropolitan"
            value={filters.isMetropolitan}
            onChange={handleInputChange}
          >
            <option value="">Todas</option>
            <option value="yes">Metropolitana</option>
            <option value="no">Municipal</option>
          </Form.Control>
        </Form.Group>
      </Col>
      <Col md={3}>
        <Form.Group controlId="company">
          <Form.Label>Empresa</Form.Label>
          <Form.Control
            as="select"
            name="company"
            value={filters.company}
            onChange={handleInputChange}
          >
            <option value="">Todas</option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Col>
    </Row>
  );
};

LineFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  companies: PropTypes.array.isRequired,
  lineTypes: PropTypes.array.isRequired,
};

export default LineFilters;
