import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '../ui/accordion/accordion.jsx';
import OffCanvasDepartureTimes from './off-canvas-departure-times.jsx';
import DirectionAccordionItem from './direction-accordion-item.jsx';

export default function Intermediate({
  data = [],
  observations,
  departure_location,
  destination_location,
  sortedDays,
  type,
  scope,
}) {
  const departureTimes = data.toSorted((a, b) => a.day - b.day);
  const uniqueDirections = [
    ...new Set(departureTimes.map((item) => item.direction)),
  ];

  if (!departure_location || !uniqueDirections) {
    return <div>Organizando horários...</div>;
  }

  const directionsToRender =
    uniqueDirections[0] === 2 ? uniqueDirections.toReversed() : uniqueDirections;

  return (
    <Accordion defaultEventKey={['0']} id="departure-times-data">
      <OffCanvasDepartureTimes />
      {directionsToRender.map((direction, i) => (
        <DirectionAccordionItem
          key={i}
          direction={direction}
          departure_location={departure_location}
          destination_location={destination_location}
          eventKey={i.toString()}
          departureTimes={departureTimes}
          sortedDays={sortedDays}
          observations={observations}
          type={type}
          scope={scope}
        />
      ))}
      <div className="mt-2">
        <p className="d-block text-body-tertiary text-sml m-0 p-0 text-balance">
          Os horários são atualizados periodicamente via integração com a companhia.
        </p>
      </div>
    </Accordion>
  );
}

Intermediate.propTypes = {
  data: PropTypes.array.isRequired,
  observations: PropTypes.any.isRequired,
  departure_location: PropTypes.string.isRequired,
  destination_location: PropTypes.string.isRequired,
  sortedDays: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['history', 'current']),
  scope: PropTypes.any,
};
