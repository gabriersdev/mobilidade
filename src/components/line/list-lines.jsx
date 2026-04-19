import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {AnimatePresence} from 'framer-motion';
import {useLineFilters} from '@/hooks/use-line-filters.js';
import useLines from '../../hooks/use-lines.js';
import Grid from '../ui/grid/grid.jsx';
import Card from '../ui/card/card.jsx';
import ScrollX from '../ui/scroll-x/scroll-x.jsx';
import PaginationWithItems from '../pagination-with-items/pagination-with-items.jsx';
import LineFilters from './line-filters.jsx';
import LineCard from './line-card.jsx';

const ListLines = ({data: initialData, variant}) => {
  const {data: fetchedData, loading} = useLines(initialData ? null : 'all');
  const {filteredData, filters, setFilters, lineTypes, setData} = useLineFilters(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    if (!initialData && fetchedData) {
      setData(fetchedData);
    }
  }, [initialData, fetchedData, setData]);
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  if (loading && !initialData) {
    return (
      <div style={{marginTop: '1rem'}}>
        <Grid>
          <Card title="Carregando" subtitle="Aguarde...">
            Estamos conectando ao banco de dados. Esse processo geralmente é rápido. Por favor, aguarde alguns instantes.
          </Card>
          {Array.from({length: 9}).map((_, i) => (
            <Card key={i} variant="placeholder"/>
          ))}
        </Grid>
      </div>
    );
  }
  
  const content = filteredData.map((line) => <LineCard key={line.line_id} line={line}/>);
  
  return (
    <div style={{marginTop: '1rem'}}>
      {variant !== 'similar-lines' && (
        <LineFilters filters={filters} onFilterChange={handleFilterChange} lineTypes={lineTypes}/>
      )}
      <AnimatePresence>
        {variant === 'similar-lines' ? (
          <ScrollX>{content}</ScrollX>
        ) : (
          <PaginationWithItems
            items={content}
            itemsPerPage={10}
            classNameOfContainer="grid similar-lines mt-3"
            beforeSelector={true}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

ListLines.propTypes = {
  data: PropTypes.array,
  variant: PropTypes.string,
};

export default ListLines;
