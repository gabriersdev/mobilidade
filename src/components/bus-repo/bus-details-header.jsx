import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

export default function BusDetailsHeader({ vehicle }) {
  return (
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
  );
}

BusDetailsHeader.propTypes = {
  vehicle: PropTypes.object.isRequired
};
