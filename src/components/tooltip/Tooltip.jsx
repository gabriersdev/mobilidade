import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import * as BootstrapTooltip from 'react-bootstrap/Tooltip';
import PropTypes from "prop-types";

const Tooltip = ({id, children, title}) => (
  <OverlayTrigger overlay={<BootstrapTooltip id={id || new Date().getTime().toString()}>{title}</BootstrapTooltip>}>
    <a href="#">{children}</a>
  </OverlayTrigger>
);

Tooltip.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export default Tooltip;
