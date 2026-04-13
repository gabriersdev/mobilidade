import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "react-bootstrap";
import {reportMail} from "@/assets/resources.js";

const LiveMenu = ({selectedStop}) => (
  <Dropdown>
    <DropdownToggle size="sm" variant="default" className="border-0 text-danger-emphasis d-flex align-items-center m-0 p-0">
      <div className="live-indicator me-1">
        <div className="live-dot"></div>
      </div>
      <span className="text-sml">Ao vivo</span>
    </DropdownToggle>
    <DropdownMenu>
      <DropdownItem as={Link} to={`/live?sei=${selectedStop?.id}`}>Acompanhar as partidas deste ponto</DropdownItem>
      <DropdownItem as={Link} to="/live">Ir para a página de Ao vivo</DropdownItem>
      <DropdownItem as={Link} to={`/guide?sei=${selectedStop?.id}`}>Linhas que param neste ponto</DropdownItem>
      <DropdownItem as={Link} to={`mailto:${reportMail}`}>
        Reportar um problema
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

LiveMenu.propTypes = {
  selectedStop: PropTypes.object,
};

export default LiveMenu;
