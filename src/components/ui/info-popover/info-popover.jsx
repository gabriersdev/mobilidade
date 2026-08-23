import {OverlayTrigger} from "react-bootstrap";
import PropTypes from "prop-types";

const InfoPopover = ({ overlay, children, placement = "auto", trigger = "click", className = "" }) => (
  <OverlayTrigger trigger={trigger} placement={placement} overlay={overlay}>
    <div className={`d-flex align-items-center flex-wrap gap-1 cursor-pointer ${className}`}>
      {children}
      <span className="text-body-tertiary bg-body-secondary rounded-circle text-sml font-monospace " style={{padding: "1px 0.5rem"}}>i</span>
    </div>
  </OverlayTrigger>
);

InfoPopover.propTypes = {
  overlay: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  placement: PropTypes.string,
  trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  className: PropTypes.string
};

export default InfoPopover;
