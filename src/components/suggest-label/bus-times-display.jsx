import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const BusTimesDisplay = ({busTimes}) => (
  <div className="d-flex gap-1 align-items-center flex-wrap text-sml">
    {busTimes.length > 0 ? (
      busTimes.map((busTime, index) => (
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
      ))
    ) : (
      <span className="text-muted">Nenhum ônibus por perto</span>
    )}
  </div>
);

BusTimesDisplay.propTypes = {
  busTimes: PropTypes.array.isRequired,
};

export default BusTimesDisplay;
