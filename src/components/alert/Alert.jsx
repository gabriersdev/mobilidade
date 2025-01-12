import React from "react";
import PropTypes from "prop-types";
import {Alert as BootstrapAlert} from "react-bootstrap";

const Alert = ({variant, margin, children}) => {
  let icon = null

  switch (variant) {
    case 'danger':
      icon = <i className="bi bi-exclamation-triangle-fill"></i>
      break;

    case 'secondary':
      icon = <i className="bi bi-info-circle"></i>
      break;

    case 'weather':
      icon = <i className="bi bi-cloud-sun"></i>
      break;

    case 'info':
    default:
      icon = <i className="bi bi-exclamation-circle"></i>
      break;
  }

  return (
    <BootstrapAlert variant={variant === 'weather' ? 'info' : variant} className={`d-flex gap-2 ${!margin ? 'mt-3' : margin}`} role="alert">
      {icon}
      {children}
    </BootstrapAlert>
  );
}

Alert.propTypes = {
  variant: PropTypes.string.isRequired,
  margin: PropTypes.string,
  children: PropTypes.node
};

export default Alert;
