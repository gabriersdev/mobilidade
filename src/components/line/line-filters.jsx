import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import {sortOrderOptions, isMetropolitanOptions} from "./filter-options.js";
import FilterItem from "./filter-item.jsx";

const LineFilters = ({filters, onFilterChange, lineTypes}) => {
  const handleInputChange = (name, value) => {
    onFilterChange({...filters, [name]: value});
  };
  
  const getLabelForValue = (options, value) => {
    const option = options.find(opt => opt[0] === value);
    return option ? option[1] : "Todos";
  };
  
  const lineTypeOptions = [
    ["", "Todos"],
    ...lineTypes.toSorted().map(type => [type, type])
  ];
  
  return (
    <Row className="mb-3 align-items-center d-none d-md-flex">
      <FilterItem
        md={2}
        label="Ordenar por"
        value={getLabelForValue(sortOrderOptions, filters.sortOrder)}
        options={sortOrderOptions}
        activeValue={filters.sortOrder}
        onSelect={value => handleInputChange("sortOrder", value)}
      />
      
      <FilterItem
        md={3}
        label="Tipo de Linha"
        value={filters.lineType || "Todos"}
        options={lineTypeOptions}
        activeValue={filters.lineType}
        onSelect={value => handleInputChange("lineType", value)}
      />
      
      <div className={"d-none"}>
        <FilterItem
          md={4}
          label="Região"
          value={getLabelForValue(isMetropolitanOptions, filters.isMetropolitan)}
          options={isMetropolitanOptions}
          activeValue={filters.isMetropolitan}
          onSelect={value => handleInputChange("isMetropolitan", value)}
        />
      </div>
    </Row>
  );
};

LineFilters.propTypes = {
  filters: PropTypes.shape({
    sortOrder: PropTypes.string,
    lineType: PropTypes.string,
    isMetropolitan: PropTypes.string,
    company: PropTypes.string,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  lineTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default LineFilters;
