import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Alert, Container, Spinner} from 'react-bootstrap';
import {busRepoService} from '../../lib/bus-repo-service';
import TechnicalSpecs from '../../components/bus-repo/technical-specs';
import HistoryTimeline from '../../components/bus-repo/history-timeline';
import BusDetailsHeader from '../../components/bus-repo/bus-details-header';
import BusOperatedLines from '../../components/bus-repo/bus-operated-lines';
import bcAll from '../../components/breadcrumb-app/breadcrumb-context.jsx';

const useBreadcrumb = bcAll.useBreadcrumb;

export default function BusDetails() {
  const {id} = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {setLabel} = useBreadcrumb();
  
  useEffect(() => {
    if (vehicle) {
      document.title = `Ônibus ${vehicle.licensePlate} | ${vehicle.company.name} | Mobilidade`;
      setLabel(vehicle.id, `Ônibus ${vehicle.licensePlate}`);
    } else {
      document.title = `Detalhes do Ônibus | Mobilidade`;
    }
  }, [vehicle, setLabel]);
  
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
      <BusDetailsHeader vehicle={vehicle}/>
      
      <BusOperatedLines operatedLines={vehicle.operatedLines}/>
      
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
