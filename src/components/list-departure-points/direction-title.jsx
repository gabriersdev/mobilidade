import React from 'react';
import PropTypes from 'prop-types';

const DirectionTitle = ({ direction, departure, destination }) => {
  let title;
  switch (direction) {
    case 1:
      title = `Sentido ida - ${departure} -> ${destination}`;
      break;
    case 0:
      title = `Sentido único - ${departure} ⇄ ${destination} (ida e volta)`;
      break;
    case 2:
      title = `Sentido volta - ${destination} -> ${departure}`;
      break;
    default:
      title = '';
  }
  return <>{title}</>;
};

DirectionTitle.propTypes = {
  direction: PropTypes.number.isRequired,
  departure: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
};

export default DirectionTitle;
