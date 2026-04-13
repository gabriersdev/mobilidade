import {forwardRef} from 'react';
import PropTypes from 'prop-types';
import Title from '../ui/title/title.jsx';
import Print from '../print/print.jsx';
import {ListDeparturePoints} from '../list-departure-points/list-departure-points.jsx';

const DeparturePointsSection = forwardRef(({line}, ref) => (
  <section id="paradas" ref={ref} className="pt-3">
    <div className="d-flex flex-wrap justify-content-between align-items-start mb-2">
      <Title type="h3" classX="pb-2 text-body-secondary">Pontos de paradas</Title>
      <Print variant="departure-points" prevContentTarget="id"/>
    </div>
    <ListDeparturePoints
      line_id={line.line_id}
      departure_location={line.departure_location}
      destination_location={line.destination_location}
    />
  </section>
));

DeparturePointsSection.displayName = 'DeparturePointsSection';

DeparturePointsSection.propTypes = {
  line: PropTypes.object.isRequired,
};

export default DeparturePointsSection;
