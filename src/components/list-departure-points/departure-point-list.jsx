import {useContext} from 'react';
import PropTypes from 'prop-types';
import PaginationWithItems from '../pagination-with-items/pagination-with-items.jsx';
import {DPContext as DeparturePointsTheme} from './departure-points-context.jsx';

const DeparturePointList = ({points, currentPage, onPageChange}) => {
  const {handlePointClick} = useContext(DeparturePointsTheme);
  
  const mapDeparturePoints = (point, index) => (
    <li key={index}>
      <button
        onClick={(e) =>
          handlePointClick(e, {
            address: point.address,
            point_name: point.point_name,
            points_length: points.length,
            point_order: index,
            departure_point_id: point?.['departure_point_id'] ?? -1,
          })
        }
        className="p-0 border-0 bg-transparent list-group-item text-body"
        role="link"
        tabIndex={-1}
        style={{textDecoration: 'none', textAlign: 'left'}}
      >
        {(point.address + (point.point_name ? ' - ' + point.point_name : '')).replace(/\\/g, ' - ')}
      </button>
    </li>
  );
  
  return (
    <>
      <div className="hide-print">
        <PaginationWithItems
          items={points.map(mapDeparturePoints)}
          itemsPerPage={10}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
      <div className="show-print">
        {points.map(mapDeparturePoints)}
      </div>
    </>
  );
};

DeparturePointList.propTypes = {
  points: PropTypes.array.isRequired,
  directionIndex: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default DeparturePointList;
