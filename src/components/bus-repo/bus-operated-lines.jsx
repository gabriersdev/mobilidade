import PropTypes from 'prop-types';
import {Card, Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function BusOperatedLines({operatedLines}) {
  return (
    <Row className="mb-4">
      <Col xs={12}>
        <Card className="border-0 bg-primary text-white">
          <Card.Body className="d-flex justify-content-between align-items-center flex-wrap gap-3 p-4">
            <div>
              <h5 className="mb-1"><i className="bi bi-diagram-3 me-2"></i> Linhas Operadas</h5>
              <p className="mb-0 text-white-50">
                {operatedLines.length > 0
                  ? `Este veículo atua nas linhas: ${operatedLines.join(', ')}`
                  : 'Nenhuma linha específica registrada.'}
              </p>
            </div>
            <div>
              {operatedLines.map(line => (
                <Link key={line} to={`/lines/${line}`} className="btn btn-light btn-sm ms-2 mb-1 fw-bold text-primary">
                  Linha {line}
                </Link>
              ))}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

BusOperatedLines.propTypes = {
  operatedLines: PropTypes.array.isRequired
};
