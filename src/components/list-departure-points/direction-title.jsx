import PropTypes from 'prop-types';
import Util from '@/lib/Util.jsx';

const DirectionTitle = ({direction, departure, destination}) => {
  return <>{Util.getDirectionTitle(direction, departure, destination)}</>;
};

DirectionTitle.propTypes = {
  direction: PropTypes.number.isRequired,
  departure: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
};

export default DirectionTitle;
