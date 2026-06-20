import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Title from '@/components/ui/title/title.jsx';
import InfoItem from '@/components/ui/info-item/info-item.jsx';
import BusDetailsActions from './bus-details-actions.jsx';
import LineIdentificationCompanyLogo from '@/components/line-identification/line-identification-company-logo.jsx';
import Util from "@/lib/Util.jsx";
import {getConservationConfig, getStatusConfig} from "./bus-details-helpers.js";

export default function BusDetailsHeader({vehicle}) {
  const statusConfig = getStatusConfig(vehicle.status);
  const conservationConfig = getConservationConfig(vehicle.conservationState);
  
  return (
    <section id="id" className="d-flex align-items-start flex-wrap gap-3 justify-content-between flex-column flex-column-reverse flex-lg-row">
      <div className="d-flex flex-column gap-3">
        <hgroup className="d-flex align-items-center gap-2 flex-wrap mb-md-3 mb-0">
          <h1 className="d-none">
            Veículo {vehicle.fleetNumber} - Placa {vehicle.licensePlate}
          </h1>
          
          <Title type="h2" classX="d-inline text-body-emphasis fw-semibold m-0 p-0">
            <span className="fs-2" style={{letterSpacing: "-1px"}}>
              Veículo {vehicle.fleetNumber}
            </span>
          </Title>
          <span className="fs-5 text-body-secondary">|</span>
          <Title type="h2" classX="fs-2 d-inline text-body-secondary fw-semibold m-0 p-0 lh-sm">
            <span className="fs-2" style={{letterSpacing: "-1px"}}>
              {vehicle.licensePlate}
            </span>
          </Title>
        </hgroup>
        
        <div className="d-flex align-items-center gap-4 flex-wrap mt-5">
          <InfoItem icon={statusConfig.icon} iconClass={statusConfig.color} value={vehicle.status}/>
          <InfoItem icon={conservationConfig.icon} iconClass={conservationConfig.color} label="Estado" value={vehicle.conservationState}/>
          <InfoItem icon="bi-hash" iconClass="text-secondary" label="Veículo" value={vehicle.fleetNumber}/>
        </div>
        
        <div className="d-flex align-items-center gap-4 flex-wrap">
          <InfoItem icon="bi-building" iconClass="text-primary" label="Operadora" value={vehicle.company.name}/>
          <Link to={`/company/${vehicle.company.id}`} className="text-decoration-none">
            <InfoItem icon="bi-buildings-fill" iconClass="text-primary" label="Companhia" value={vehicle.company.name}/>
          </Link>
          {vehicle.lastUpdate && (
            <InfoItem>
              <div className="d-flex align-items-center gap-1">
                <i className="bi bi-stopwatch"></i>
                {/*TODO - o retorno vem assim: 2026-06-20T15:21:13.000Z, quando a atualização foi feita em 2026-06-20T09:21:13.000-03:00. Verificar onde está o problema e tratar para evitar esta substituição grosseira*/}
                <span className="ms-1 text-body fw-medium">Infos. atualizadas {Util.renderText(Util.diffToHuman(vehicle.lastUpdate.replace("Z", "+03:00")))}</span>
              </div>
            </InfoItem>
          )}
        </div>
        
        <BusDetailsActions vehicle={vehicle}/>
      </div>
      <LineIdentificationCompanyLogo companyId={vehicle.company.id}/>
    </section>
  );
}

BusDetailsHeader.propTypes = {
  vehicle: PropTypes.object.isRequired
};
