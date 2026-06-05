import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Alert, Badge, Card, Col, Container, Row, Spinner} from 'react-bootstrap';
import {busRepoService} from '../../lib/bus-repo-service';
import TechnicalSpecs from '../../components/bus-repo/technical-specs';
import HistoryTimeline from '../../components/bus-repo/history-timeline';

// TODO - implementar forma de trocar document.title e informações do breadcrumb, tal qual quando informações das linhas são listadas
// TODO - separar código de acordo com funcionalidades e responsabilidades em sub componentes

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

const getConservationVariant = (state) => {
  switch (state) {
    case 'Excelente':
      return 'success';
    case 'Bom':
      return 'primary';
    case 'Regular':
      return 'warning';
    case 'Ruim':
      return 'danger';
    case 'Precário':
      return 'dark';
    default:
      return 'secondary';
  }
};

export default function BusDetails() {
  const {id} = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true);
        const data = await busRepoService.getVehicleById(id);
        setVehicle(data);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Veículo não encontrado ou erro ao carregar os dados.');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle().then();
  }, [id]);
  
  if (loading) {
    return (
      <Container className="py-5 text-center" style={{minHeight: '60vh'}}>
        <Spinner animation="border" variant="primary"/>
        <p className="mt-3 text-muted">Carregando detalhes do veículo...</p>
      </Container>
    );
  }
  
  if (error || !vehicle) {
    return (
      <Container className="py-5" style={{minHeight: '60vh'}}>
        <Alert variant="danger">
          <h4 className="alert-heading">Ops!</h4>
          <p>{error}</p>
          <hr/>
          <Link to="/bus-repo" className="btn btn-outline-danger">Voltar para a listagem</Link>
        </Alert>
      </Container>
    );
  }
  
  return (
    <Container className="py-5 pb-5">
      <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <Link to="/bus-repo" className="text-decoration-none text-muted mb-2 d-inline-block">
            <i className="bi bi-arrow-left me-1"></i> Voltar para Frota
          </Link>
          <h1 className="fw-bold mb-1">
            Placa {vehicle.licensePlate}
            <Badge bg={getStatusVariant(vehicle.status)} className="ms-3 fs-6 align-middle">
              {vehicle.status}
            </Badge>
          </h1>
          <h5 className="text-muted">
            Frota: <strong>{vehicle.fleetNumber}</strong> • Operadora: {vehicle.company.name}
          </h5>
        </div>
        <div className="text-end">
          <Badge bg={getConservationVariant(vehicle.conservationState)} className="fs-6 p-2 ">
            Estado: {vehicle.conservationState}
          </Badge>
        </div>
      </div>
      
      <Row className="mb-4">
        <Col xs={12}>
          <Card className="border-0 bg-primary text-white">
            <Card.Body className="d-flex justify-content-between align-items-center flex-wrap gap-3 p-4">
              <div>
                <h5 className="mb-1"><i className="bi bi-diagram-3 me-2"></i> Linhas Operadas</h5>
                <p className="mb-0 text-white-50">
                  {vehicle.operatedLines.length > 0
                    ? `Este veículo atua nas linhas: ${vehicle.operatedLines.join(', ')}`
                    : 'Nenhuma linha específica registrada.'}
                </p>
              </div>
              <div>
                {/* Aqui poderíamos ter botões para ir à tela da linha (Link to=/lines/:id) */}
                {vehicle.operatedLines.map(line => (
                  <Link key={line} to={`/lines/${line}`} className="btn btn-light btn-sm ms-2 mb-1 fw-bold text-primary">
                    Linha {line}
                  </Link>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Observações Gerais */}
      {vehicle.generalNotes && (
        <Alert variant="info" className="border-0 mb-4">
          <i className="bi bi-info-circle-fill me-2"></i>
          <strong>Observações Gerais:</strong> {vehicle.generalNotes}
        </Alert>
      )}
      
      {/* Especificações Técnicas e Conforto */}
      <TechnicalSpecs vehicle={vehicle}/>
      
      {/* Linha do Tempo / Histórico */}
      <HistoryTimeline incidents={vehicle.incidents} maintenances={vehicle.maintenances}/>
    
    </Container>
  );
}
