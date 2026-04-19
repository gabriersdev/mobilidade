import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import PaginationWithItems from '@/components/pagination-with-items/pagination-with-items.jsx';

const GuideLineList = ({lines}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <PaginationWithItems
      itemsPerPage={10}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      items={lines.map((line) => (
        <li key={line.lineId}>
          <Link to={`/lines/${line.lineId}`}>
            Linha {line.lineNumber} - {line.lineName.replace(/\\|\//g, ' ⇄ ')}
          </Link>
        </li>
      ))}
    />
  );
};

GuideLineList.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.shape({
    lineId: PropTypes.any.isRequired,
    lineNumber: PropTypes.string.isRequired,
    lineName: PropTypes.string.isRequired,
  })).isRequired,
};

export default GuideLineList;
