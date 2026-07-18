import {useState} from 'react';
import {Accordion, Button, ListGroup} from 'react-bootstrap';
import PaginationWithItems from "@/components/pagination-with-items/pagination-with-items.jsx";
import PropTypes from "prop-types";

const CacheAccordionItem = ({cacheName, index, cachesData, handleDeleteCache, handleDeleteCacheFile}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const cacheUrls = cachesData[cacheName] || [];
  
  const listItems = cacheUrls.map((url, index) => {
    const displayUrl = url.startsWith(window.location.origin)
      ? url.replace(window.location.origin, '')
      : url;
    return (
      <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center p-2 text-ellipsis">
        <span className="text-truncate text-sml text-muted me-2" title={displayUrl} style={{maxWidth: '350px'}}>
          {displayUrl}
        </span>
        <Button variant="danger" size="sm" onClick={() => handleDeleteCacheFile(cacheName, url)} title="Apagar arquivo">
          <i className="bi bi-x"></i>
        </Button>
      </ListGroup.Item>
    );
  });
  
  return (
    <Accordion.Item eventKey={index.toString()} key={cacheName}>
      <Accordion.Header>
        <span className="text-truncate fw-semibold me-2" title={cacheName} style={{maxWidth: '220px'}}>{cacheName}</span>
        <span className={"text-sml"}>- {cacheUrls.length} arquivos</span>
      </Accordion.Header>
      <Accordion.Body className="p-0">
        <div className="p-2 border-bottom bg-light d-flex justify-content-between align-items-center gap-1 flex-wrap">
          <span className="text-muted text-sml">Ações para este cache:</span>
          <Button variant="danger" size="sm" onClick={() => handleDeleteCache(cacheName)} className={"text-sml"}>
            Apagar todos os itens
          </Button>
        </div>
        
        {cacheUrls.length > 0 ? (
          <div className="p-2">
            <PaginationWithItems
              items={listItems}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              beforeSelector={true}
              classNameOfContainer="list-group list-group-flush"
            />
          </div>
        ) : (
          <div className="p-3 text-muted text-center text-sml">Nenhum arquivo encontrado.</div>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
};

CacheAccordionItem.propTypes = {
  cacheName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  cachesData: PropTypes.object.isRequired,
  handleDeleteCache: PropTypes.func.isRequired,
  handleDeleteCacheFile: PropTypes.func.isRequired,
};

export default CacheAccordionItem;
