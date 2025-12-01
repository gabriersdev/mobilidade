import {useEffect, useRef, useState} from 'react';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from "prop-types";

const PaginationWithItems = ({items, itemsPerPage, classNameOfItems, beforeSelector}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const paginationElement = useRef();
  const [paginationSelector, setPaginationSelector] = useState(<></>);
  
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
  const displayedItems = items.slice(startIndex, endIndex);
  
  const handleClick = (pageNumber) => {
    if (paginationElement.current) {
      setTimeout(() => {
        window.scroll({
          behavior: "smooth",
          top: (paginationElement.current?.offsetTop ?? 300) - (10 * 16)
        });
      }, 100);
    }
    setCurrentPage(pageNumber);
  };
  
  const renderPageItems = () => {
    let pageItems = [];
    
    const showFirstAndLast = true;
    const showNeighbors = 2;
    
    if (totalPages <= 5 || currentPage <= 3) {
      for (let number = 1; number <= Math.min(5, totalPages); number++) {
        pageItems.push(renderPageItem(number));
      }
    } else if (currentPage >= totalPages - 2) {
      for (let number = totalPages - 4; number <= totalPages; number++) {
        pageItems.push(renderPageItem(number));
      }
    } else {
      if (showFirstAndLast) pageItems.push(renderPageItem(1));
      if (currentPage > 2 + showNeighbors && !showFirstAndLast) pageItems.push(<Pagination.Ellipsis key="ellipsis-start"/>);
      for (let number = currentPage - showNeighbors; number <= currentPage + showNeighbors; number++) {
        pageItems.push(renderPageItem(number));
      }
      if (currentPage < totalPages - 1 - showNeighbors && !showFirstAndLast) pageItems.push(<Pagination.Ellipsis key="ellipsis-end"/>);
      if (showFirstAndLast) pageItems.push(renderPageItem(totalPages));
    }
    
    return pageItems;
  };
  
  const renderPageItem = (number) => (
    <Pagination.Item
      key={number}
      active={number === currentPage}
      onClick={() => handleClick(number)}
    >
      {number}
    </Pagination.Item>
  );
  
  useEffect(() => {
    if (totalPages > 1) {
      setPaginationSelector(
        <Pagination className={"p-0 overflow-x-scroll m-0 p-0"}>
          <Pagination.First onClick={() => handleClick(1)} disabled={currentPage === 1}/>
          <Pagination.Prev onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}/>
          {renderPageItems()}
          <Pagination.Next onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}/>
          <Pagination.Last onClick={() => handleClick(totalPages)} disabled={currentPage === totalPages}/>
        </Pagination>
      )
    }
  }, [currentPage]);
  
  if (totalItems === 0) return <p>No items found.</p>;
  
  return (
    <div ref={paginationElement}>
      {beforeSelector && (
        <div className={"mt-0"}>
          {paginationSelector}
        </div>
      )}
      <div>
        {displayedItems.map((item, index) => (
          <div key={index} className={classNameOfItems}>
            {/* Render each item here */}
            {item}
          </div>
        ))}
      </div>
      <div className={"mt-3"}>
        {paginationSelector}
      </div>
    </div>
  );
};

PaginationWithItems.propTypes = {
  items: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  classNameOfItems: PropTypes.string,
  beforeSelector: PropTypes.bool
}

export default PaginationWithItems;
