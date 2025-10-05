import PropTypes from "prop-types";
import {Alert as BootstrapAlert} from "react-bootstrap";

let icon = null

const Alert = ({variant, margin, children = <></>}) => {
  switch (variant) {
    case 'danger':
      icon = <i className="bi bi-exclamation-triangle-fill"></i>
      break;

    case 'secondary':
      icon = <i className="bi bi-exclamation-square"></i>
      break;

    case 'weather':
      icon = <i className="bi bi-cloud-sun"></i>
      break;

    case 'info':
    default:
      icon = <i className="bi bi-arrow-right-square"></i>
      break;
  }
  
  return (
    <BootstrapAlert variant={variant === 'weather' ? 'info' : variant} className={`d-flex flex-row gap-2 ${!margin ? 'mt-3' : margin} text-balance`} role="alert">
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
