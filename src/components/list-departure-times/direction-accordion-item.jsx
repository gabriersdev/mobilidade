import PropTypes from 'prop-types';
import AccordionItem from '../ui/accordion/accordion-item.jsx';
import {ThemeContext} from '../ui/theme-context/theme-context.jsx';
import AccordionOperationDays from './accordion-operation-days.jsx';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import DirectionTitle from '../list-departure-points/direction-title.jsx';

const DirectionAccordionItem = ({
                                  direction,
                                  departure_location,
                                  destination_location,
                                  eventKey,
                                  departureTimes,
                                  sortedDays,
                                  observations,
                                  type,
                                  scope,
                                }) => (
  <AccordionItem
    title={
      <DirectionTitle
        direction={direction}
        departure={departure_location}
        destination={destination_location}
      />
    }
    eventKey={eventKey}
  >
    <ThemeContext.Provider
      value={{
        departureTimes,
        uniqueDaysForDirection: sortedDays,
        index: eventKey,
        direction,
        directionName: (
          <DirectionTitle
            direction={direction}
            departure={departure_location}
            destination={destination_location}
          />
        ),
        observations,
        type,
        scope,
      }}
    >
      <AccordionOperationDays/>
      <div className="d-flex gap-2 align-items-center mt-4">
        <OverlayTrigger overlay={<Tooltip>Não houve alteração no quadro de horários</Tooltip>}>
          <span>
            <i className="bi bi-dash-circle-fill text-primary"></i>
          </span>
        </OverlayTrigger>
        <span className="text-body-secondary line-clamp-1 text-sml">
          {departureTimes.length.toLocaleString()} horários de partidas neste sentido.
        </span>
      </div>
    </ThemeContext.Provider>
  </AccordionItem>
);

DirectionAccordionItem.propTypes = {
  direction: PropTypes.number.isRequired,
  departure_location: PropTypes.string.isRequired,
  destination_location: PropTypes.string.isRequired,
  eventKey: PropTypes.string.isRequired,
  departureTimes: PropTypes.array.isRequired,
  sortedDays: PropTypes.any.isRequired,
  observations: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['history', 'current']),
  scope: PropTypes.any,
};

export default DirectionAccordionItem;
