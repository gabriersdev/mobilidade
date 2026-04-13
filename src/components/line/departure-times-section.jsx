import PropTypes from 'prop-types';
import Title from '../ui/title/title.jsx';
import Print from '../print/print.jsx';
import {ListDepartureTimes} from '../list-departure-times/list-departure-times.jsx';

const DepartureTimesSection = ({line}) => (
  <section id="partidas" className="pt-3">
    <div className="d-flex flex-wrap justify-content-between align-items-start mb-2">
      <Title type="h3" classX="pb-2 text-body-secondary">Horários de partidas</Title>
      <Print variant="departure-times" prevContentTarget="id"/>
    </div>
    <ListDepartureTimes
      line_id={line.line_id}
      departure_location={line.departure_location}
      destination_location={line.destination_location}
      scope={line.scope}
    />
  </section>
);

DepartureTimesSection.propTypes = {
  line: PropTypes.object.isRequired,
};

export default DepartureTimesSection;
