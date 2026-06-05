import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Title from '@/components/ui/title/title.jsx';
import InfoItem from '@/components/ui/info-item/info-item.jsx';
import BusDetailsActions from './bus-details-actions.jsx';
import LineIdentificationCompanyLogo from '@/components/line-identification/line-identification-company-logo.jsx';

const getStatusConfig = (status) => {
  switch (status) {
    case 'Em atividade':
      return { icon: 'bi-check-circle-fill', color: 'text-success' };
    case 'Em manutenção':
      return { icon: 'bi-tools', color: 'text-warning' };
    case 'Desativado':
      return { icon: 'bi-x-circle-fill', color: 'text-danger' };
    case 'Substituído':
      return { icon: 'bi-arrow-left-right', color: 'text-secondary' };
    default:
      return { icon: 'bi-info-circle-fill', color: 'text-secondary' };
  }
};

const getConservationConfig = (state) => {
  switch (state) {
    case 'Excelente':
      return { icon: 'bi-star-fill', color: 'text-success' };
    case 'Bom':
      return { icon: 'bi-star-fill', color: 'text-primary' };
    case 'Regular':
      return { icon: 'bi-star-fill', color: 'text-warning' };
    case 'Ruim':
      return { icon: 'bi-exclamation-triangle', color: 'text-danger' };
    case 'Precário':
      return { icon: 'bi-exclamation-octagon-fill', color: 'text-dark' };
    default:
      return { icon: 'bi-info-circle', color: 'text-secondary' };
  }
};

export default function BusDetailsHeader({ vehicle }) {
  const statusConfig = getStatusConfig(vehicle.status);
  const conservationConfig = getConservationConfig(vehicle.conservationState);

  return (
    <section id="id" className="d-flex align-items-start flex-wrap gap-3 justify-content-between flex-column flex-column-reverse flex-lg-row">
      <div className="d-flex flex-column gap-3">
        <hgroup className="d-flex align-items-center gap-2 flex-wrap mb-0">
          <h1 className="d-none">
            Veículo {vehicle.fleetNumber} - Placa {vehicle.licensePlate}
          </h1>

          <Title type="h2" classX="d-inline text-body-emphasis fw-semibold m-0 p-0">
            <span className="fs-2" style={{ letterSpacing: "-1px" }}>
              Veículo {vehicle.fleetNumber}
            </span>
          </Title>
          <span className="fs-5 text-body-secondary">|</span>
          <Title type="h2" classX="fs-2 d-inline text-body-secondary fw-semibold m-0 p-0 lh-sm">
            <span className="fs-2" style={{ letterSpacing: "-1px" }}>
              {vehicle.licensePlate}
            </span>
          </Title>
        </hgroup>

        <div className="d-flex align-items-center gap-4 flex-wrap mb-2">
          <InfoItem
            icon={statusConfig.icon}
            iconClass={statusConfig.color}
            value={vehicle.status}
          />
          <InfoItem
            icon={conservationConfig.icon}
            iconClass={conservationConfig.color}
            label="Estado"
            value={vehicle.conservationState}
          />
          <InfoItem
            icon="bi-hash"
            iconClass="text-secondary"
            label="Frota"
            value={vehicle.fleetNumber}
          />
          <Link to={`/company/${vehicle.company.id}`} className="text-decoration-none">
            <InfoItem
              icon="bi-buildings-fill"
              iconClass="text-primary"
              label="Operadora"
              value={vehicle.company.name}
            />
          </Link>
          {vehicle.lastUpdate && (
            <InfoItem>
              <div className="d-flex align-items-center gap-1">
                <i className="bi bi-stopwatch"></i>
                <span className="ms-1 text-body fw-medium">Infos. atualizadas em {vehicle.lastUpdate}</span>
              </div>
            </InfoItem>
          )}
        </div>
        <BusDetailsActions vehicle={vehicle} />
      </div>
      <LineIdentificationCompanyLogo companyId={vehicle.company.id} />
    </section>
  );
}

BusDetailsHeader.propTypes = {
  vehicle: PropTypes.object.isRequired
};
