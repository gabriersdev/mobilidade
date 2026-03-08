import PropTypes from "prop-types";
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
    <div className="mb-3 align-items-center d-none d-md-flex gap-3">
      <FilterItem
        label="Ordenar por"
        value={getLabelForValue(sortOrderOptions, filters.sortOrder)}
        options={sortOrderOptions}
        activeValue={filters.sortOrder}
        onSelect={value => handleInputChange("sortOrder", value)}
      />
      
      <FilterItem
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
    </div>
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
