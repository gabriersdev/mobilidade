import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {busRepoService} from '../../lib/bus-repo-service';
import AnimatedComponents from '@/components/ui/animated-component/animated-components.jsx';
import FeedbackError from '@/components/ui/feedback-error/feedback-error.jsx';
import LinePlaceholder from '@/components/line/line-placeholder.jsx';
import Alert from '@/components/ui/alert/alert.jsx';
import BusDetailsHeader from '../../components/bus-repo/bus-details-header';
import BusOperatedLines from '../../components/bus-repo/bus-operated-lines';
import TechnicalSpecs from '../../components/bus-repo/technical-specs';
import HistoryTimeline from '../../components/bus-repo/history-timeline';
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
      } catch (err) {
        setError('Veículo não encontrado ou erro ao carregar os dados.');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);
  
  if (loading) {
    return <div className="mt-4"><LinePlaceholder/></div>;
  }
  
  if (error || !vehicle) {
    return (
      <AnimatedComponents>
        <FeedbackError code={404} text={error || 'Veículo não encontrado.'} type={'card'}/>
      </AnimatedComponents>
    );
  }
  
  return (
    <AnimatedComponents>
      <div className="d-flex flex-column mt-4" style={{gap: '3rem', marginBottom: '4rem'}}>
        <BusDetailsHeader vehicle={vehicle} />
        
        {vehicle.generalNotes && (
          <section>
            <Alert variant="info" margin="m-0">
              <div className="d-flex flex-column gap-1">
                <span className="fw-bold">Observações Gerais</span>
                <span>{vehicle.generalNotes}</span>
              </div>
            </Alert>
          </section>
        )}
        
        <BusOperatedLines operatedLines={vehicle.operatedLines} />
        <TechnicalSpecs vehicle={vehicle}/>
        <HistoryTimeline incidents={vehicle.incidents} maintenances={vehicle.maintenances}/>
      </div>
    </AnimatedComponents>
  );
}
