import React, { useContext, useEffect } from 'react';
import AccordionItem from '../ui/accordion/accordion-item.jsx';
import { DeparturePointsDataContext } from './departure-points-context.jsx';
import { Context as LineContext } from '../line/line-context.jsx';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import DirectionTitle from './direction-title.jsx';
import DeparturePointList from './departure-point-list.jsx';

const ListPointsByDirections = () => {
  const {
    uniqueDirections,
    departure_location,
    destination_location,
    departurePointsByDirection,
    paginationCurrentPages,
    handlePageChange,
  } = useContext(DeparturePointsDataContext);
  const { setFirstPointByDirection } = useContext(LineContext);

  useEffect(() => {
    uniqueDirections.forEach((direction, i) => {
      const firstPoint = departurePointsByDirection[i]?.[0];
      if (firstPoint) {
        setFirstPointByDirection((prev) => ({
          ...prev,
          [direction]: firstPoint,
        }));
      }
    });
  }, [uniqueDirections, departurePointsByDirection, setFirstPointByDirection]);

  return uniqueDirections.map((direction, i) => (
    <AccordionItem
      key={i}
      title={
        <DirectionTitle
          direction={direction}
          departure={departure_location}
          destination={destination_location}
        />
      }
      eventKey={i.toString()}
    >
      <ul className="list-line-content list-group d-flex gap-2 ms-md-3">
        <DeparturePointList
          points={departurePointsByDirection[i]}
          directionIndex={i}
          currentPage={paginationCurrentPages[i] || 1}
          onPageChange={(page) => handlePageChange(i, page)}
        />
      </ul>
      <div className="d-flex gap-2 flex-wrap align-items-center mt-4">
        <OverlayTrigger overlay={<Tooltip>Não houve alteração nos pontos de paradas</Tooltip>}>
          <span>
            <i className="bi bi-dash-circle-fill text-primary"></i>
          </span>
        </OverlayTrigger>
        <span className="d-inline-block text-muted">
          {departurePointsByDirection[i].length.toLocaleString()} pontos de paradas neste sentido.
        </span>
      </div>
    </AccordionItem>
  ));
};

export default ListPointsByDirections;
