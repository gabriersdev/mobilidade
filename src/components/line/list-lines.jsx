import PropTypes from "prop-types";
import Card from "../ui/card/card.jsx";
import {Badge} from "react-bootstrap";
import Util from "../../assets/Util.jsx";
import Convert from "../../assets/Convert.js";
import {useEffect, useState} from "react";
import PaginationWithItems from "../pagination-with-items/pagination-with-items.jsx";
import GetCompanyIdentification from "./get-company-identification.jsx";
import ScrollX from "../ui/scroll-x/scroll-x.jsx";
import LineFilters from "./line-filters.jsx";
import {AnimatePresence, motion} from "framer-motion";
import useLines from "../../hooks/useLines.js";
import Grid from "../ui/grid/grid.jsx";

const ListLines = ({data: initialData, variant}) => {
  const {data: fetchedData, loading} = useLines(initialData ? null : 'all');
  const [content, setContent] = useState([]);
  const [data, setData] = useState(initialData || []);
  
  const [filters, setFilters] = useState({
    sortOrder: "none",
    lineType: "",
    isMetropolitan: "",
    company: "",
  });
  
  const [lineTypes, setLineTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    if (!initialData && fetchedData) {
      setData(fetchedData);
    }
  }, [initialData, fetchedData]);
  
  useEffect(() => {
    if (Array.isArray(data)) {
      const uniqueLineTypes = [...new Set(data.map((line) => Convert.lineType(line.type)).filter(Boolean))];
      setLineTypes(uniqueLineTypes);
    }
  }, [data]);
  
  useEffect(() => {
    if (Array.isArray(data)) {
      let filteredData = [...data];
      
      // Filtering
      if (filters.lineType) filteredData = filteredData.filter(line => Convert.lineType(line.type) === filters.lineType);
      if (filters.isMetropolitan) filteredData = filteredData.filter(line => (filters.isMetropolitan === 'yes' ? line.is_metropolitan : !line.is_metropolitan));
      if (filters.company) filteredData = filteredData.filter(line => line.company_name === filters.company);
      
      // Sorting
      filteredData.sort((a, b) => {
        switch (filters.sortOrder) {
          case "number-desc":
            return b.line_number.localeCompare(a.line_number);
          case "fare-asc":
            return a.fare - b.fare;
          case "fare-desc":
            return b.fare - a.fare;
          case "number-asc":
            return a.line_number.localeCompare(b.line_number);
          case "none":
          default:
            return a.line_number.localeCompare(b.line_number);
        }
      });
      
      const lines = filteredData.map((line) => (
        <motion.div
          key={line.line_id}
          initial={{opacity: 0, scale: 1, y: 10}}
          animate={{opacity: 1, scale: 1, y: 0}}
          exit={{opacity: 0, scale: 1, y: -10}}
          transition={{duration: 0.5}}
        >
          <Card
            title={`Linha`}
            link={`/lines/${line.line_id}`}
            badge={(
              <div className="d-flex flex-wrap gap-1">
                <Badge
                  className={"bg-primary rounded-5 text-white"}
                  style={{letterSpacing: '0.5px'}}>
                  N.º {line.line_number}
                </Badge>
                
                {parseFloat(line.fare) > 0 ? (<Badge
                  className={"bg-primary-subtle rounded-5 text-primary-emphasis"}
                  style={{letterSpacing: '0.5px'}}>
                  {Util.formatMoney(line.fare)}
                </Badge>) : ""}
                
                {line.type ? (<Badge
                  className={`${Convert.colorIdentification((Convert.lineType(line.type) || "").split(' ')[0])} rounded-5`}
                  style={{letterSpacing: '0.5px'}}>
                  {(Convert.lineType(line.type) || "").split(' ')[0]}
                </Badge>) : ""}
                
                <GetCompanyIdentification line={line}/>
              </div>
            )}
            subtitle={
              line.direction === 0 ? (`${line.departure_location} ⇄ ${line.destination_location} (ida e volta)`) : `${line.departure_location} ⇄ ${line.destination_location}`.trim()
            }
          >
            {Util.resumeInfoLine(line)}
          </Card>
        </motion.div>
      ));
      setContent(lines);
    } else {
      setContent([]);
    }
  }, [data, filters]);
  
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
          {Array.from({length: 9}, (_, i) => i).map((_, key) => (
            <Card key={key} variant={"placeholder"}></Card>
          ))}
        </Grid>
      </div>
    );
  }
  
  return (
    <div style={{marginTop: '1rem'}}>
      {variant !== "similar-lines" && (
        <LineFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          lineTypes={lineTypes}
        />
      )}
      <AnimatePresence>
        {variant === "similar-lines" ? (
          <ScrollX>{content}</ScrollX>
        ) : (
          <PaginationWithItems
            items={content}
            itemsPerPage={10}
            classNameOfContainer={"grid similar-lines mt-3"}
            beforeSelector={true}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

ListLines.propTypes = {
  data: PropTypes.array,
  variant: PropTypes.string,
}

export default ListLines;
