import PropTypes from 'prop-types';
import {Badge} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Title from '@/components/ui/title/title.jsx';

export default function BusOperatedLines({operatedLines}) {
  return (
    <section id="linhas-operadas">
      <Title type="h2" title="Linhas em que o veículo está atribuído" classX="text-body-secondary mb-3"/>
      {operatedLines.length > 0 ? (
        <div className="d-flex flex-wrap gap-2">
          {operatedLines.map(line => (
            <Badge
              key={line}
              pill
              as={Link}
              to={`/lines/${line}`}
              className="rounded-5 text-decoration-none"
              style={{letterSpacing: '0.5px'}}
            >
              N.º {line}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-body">Nenhuma linha específica registrada para este veículo.</p>
      )}
    </section>
  );
}

BusOperatedLines.propTypes = {
  operatedLines: PropTypes.array.isRequired
};
