import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import BusTimePlaceholder from './bus-time-placeholder.jsx';

const BusTimesDisplay = ({busTimes, loading}) => {
  if (loading) return <BusTimePlaceholder/>;
  
  if (busTimes.length === 0) return <span className="text-muted">Nenhum ônibus por perto</span>;
  
  return (
    <div className="d-flex gap-1 align-items-center flex-wrap text-sml">
      {busTimes.map((busTime, index) => (
        <React.Fragment key={busTime.id}>
          <div>
            <Link className="text-body text-decoration-none" to={busTime.link}>
              <span>{busTime.label}</span>
            </Link>
          </div>
          {index < busTimes.length - 1 && (
            <span className="fs-inherit text-body-tertiary">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

BusTimesDisplay.propTypes = {
  busTimes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default BusTimesDisplay;
