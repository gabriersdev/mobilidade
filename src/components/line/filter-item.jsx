import PropTypes from "prop-types";
import {Col, Dropdown} from "react-bootstrap";

const FilterItem = ({md, label, value, options, onSelect, activeValue}) => {
  return (
    <Col md={md}>
      <Dropdown>
        <Dropdown.Toggle
          variant="light"
          className="border-0 p-0 m-0 d-flex flex-nowrap gap-1 align-items-center text-sml"
          style={{background: "unset", maxWidth: 200}}
        >
          <span className={"text-truncate fs-inherit text-body-secondary"}>{label}:</span>
          <span className="text-body text-truncate fs-inherit">{value}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {options.map(([val, lab]) => (
            <Dropdown.Item
              key={val}
              active={activeValue === val}
              onClick={() => onSelect(val)}
            >
              {lab}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
};

FilterItem.propTypes = {
  md: PropTypes.number,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  onSelect: PropTypes.func.isRequired,
  activeValue: PropTypes.string.isRequired,
};

export default FilterItem;
