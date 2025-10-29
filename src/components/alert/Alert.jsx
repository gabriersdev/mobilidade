import {useState} from "react";
import PropTypes from "prop-types";
import {Alert as BootstrapAlert} from "react-bootstrap";

const Alert = ({variant, margin, children = <></>, dismissible = false, onClose = () => {}}) => {
  const [show, setShow] = useState(true);
  
  if (!show) {
    return null;
  }
  
  let icon = null;
  switch (variant) {
    case 'danger':
      icon = <i className="bi bi-exclamation-triangle-fill"></i>;
      break;
    
    case 'secondary':
      icon = <i className="bi bi-exclamation-square"></i>;
      break;
    
    case 'weather':
      icon = <i className="bi bi-cloud-sun"></i>;
      break;
    
    case 'info':
    default:
      icon = <i className="bi bi-arrow-right-square"></i>;
      break;
  }
  
  const handleClose = () => {
    setShow(false);
    onClose();
  };
  
  return (
    <BootstrapAlert
      variant={variant === 'weather' ? 'info' : variant}
      className={`d-flex flex-row gap-2 ${!margin ? 'mt-3' : margin} text-balance`}
      role="alert"
      show={show}
      onClose={handleClose}
      dismissible={dismissible}
    >
      {icon}
      {children}
    </BootstrapAlert>
  );
};

Alert.propTypes = {
  variant: PropTypes.string.isRequired,
  margin: PropTypes.string,
  children: PropTypes.node,
  dismissible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Alert;
