import PropTypes from 'prop-types';
import {Dropdown, DropdownItem, DropdownItemText, DropdownMenu, DropdownToggle, OverlayTrigger, Tooltip} from "react-bootstrap";

const StopSelector = ({stops, selectedStop, onSelectStop}) => (
  <Dropdown>
    <DropdownToggle variant="default" className="border-0 p-0 m-0 text-body-secondary line-clamp-w-200">
      <span className="text-sml">{selectedStop ? selectedStop.label : "Selecione um ponto"}</span>
    </DropdownToggle>
    <DropdownMenu style={{maxHeight: "150px"}} className="overflow-y-scroll">
      <DropdownItemText className="text-sml text-body-secondary">
        Principais paradas ({stops.length})
      </DropdownItemText>
      {[...stops].map((stop) => (
        <DropdownItem
          key={stop.id}
          onClick={() => onSelectStop(stop)}
          className="line-clamp-1"
          style={{maxWidth: "300px"}}
        >
          <OverlayTrigger overlay={<Tooltip placement="left-start"><span className="text-sml">Endereço do ponto de parada</span></Tooltip>}>
            <span>{stop.label}</span>
          </OverlayTrigger>
        </DropdownItem>
      ))}
    </DropdownMenu>
  </Dropdown>
);

StopSelector.propTypes = {
  stops: PropTypes.array.isRequired,
  selectedStop: PropTypes.object,
  onSelectStop: PropTypes.func.isRequired,
};

export default StopSelector;
