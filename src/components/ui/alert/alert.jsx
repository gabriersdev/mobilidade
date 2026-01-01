import {useState} from "react";
import PropTypes from "prop-types";
import {Alert as BootstrapAlert} from "react-bootstrap";

const Alert = ({
                 variant, margin, children = <></>, dismissible = false, onClose = () => {
  }, className
               }) => {
  const [show, setShow] = useState(true);
  const [propOpen, setPropOpen] = useState(false);
  
  if (!show) {
    return null;
  }
  
  let icon;
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
      className={`d-flex flex-row gap-2 ${!margin ? 'mt-3' : margin} text-balance` + " " + (className ?? "")}
      role="alert"
      show={show}
      onClose={handleClose}
      dismissible={dismissible}
    >
      <details>
        <summary open={propOpen} onClick={() => {
          setPropOpen(!propOpen)
        }} className={"alert-warning-summary d-flex gap-2"}>
          <span className={"d-block"}>{icon}</span>
          <div className={"line-clamp-1 text-wrap"}>Aviso. Clique para visualizar</div>
        </summary>
        <div className={"mt-3"}>
          {children}
        </div>
      </details>
    </BootstrapAlert>
  );
};

Alert.propTypes = {
  variant: PropTypes.string.isRequired,
  margin: PropTypes.string,
  children: PropTypes.node,
  dismissible: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string
};

export default Alert;
