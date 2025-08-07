import Toast from 'react-bootstrap/Toast';
import PropTypes from "prop-types";

function ToastComponent({setShow, show, title, time, content}) {
  return (
    <div aria-live="polite" aria-atomic="true" className="position-fixed z-3" style={{bottom: '2rem', right: '2rem'}}>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide position="bottom-right">
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
          <span className="text-muted">{time}</span>
        </Toast.Header>
        <Toast.Body className="">
          <span className={"text-body"}>{content}</span>
        </Toast.Body>
      </Toast>
    </div>
  );
}

ToastComponent.propTypes = {
  setShow: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired,
}

export default ToastComponent;
