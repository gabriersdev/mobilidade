import {Button, Spinner} from "react-bootstrap";
import PropTypes from "prop-types";
import AnimatedComponents from "../ui/animated-component/animated-components.jsx";

const PrintButton = ({loading, onClick}) => {
  return (
    <AnimatedComponents>
      <Button
        variant="primary"
        className={`btn-sm d-flex align-items-center justify-content-center ${
          loading ? "cursor-not-allowed opacity-75" : ""
        }`}
        onClick={onClick}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="me-2 d-none d-sm-inline">Imprimindo</span>
            <Spinner animation="grow" role="status" size="sm">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </>
        ) : (
          <>
            <span className="me-2 d-none d-sm-inline text-sml">Imprimir</span>
            <i className="bi bi-printer-fill text-sml"></i>
          </>
        )}
      </Button>
    </AnimatedComponents>
  );
};

PrintButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PrintButton;
