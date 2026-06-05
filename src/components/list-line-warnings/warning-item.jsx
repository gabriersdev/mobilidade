import {useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import Util from "../../lib/Util.jsx";

const WarningItem = ({warning, onDismiss}) => {
  const [propOpen, setPropOpen] = useState(false);
  
  return (
    <div className="alert alert-warning m-0 d-flex align-items-start gap-3 justify-content-between" role="alert">
      <details>
        <summary open={propOpen} onClick={() => {
          setPropOpen(!propOpen)
        }} className={"alert-warning-summary"}>
          <p className="alert-heading d-inline-block fw-bold mb-0">
            <span>{`${warning.title.endsWith('.') ? warning.title : `${warning.title}.`}`.trim()}</span>
            <span className={"ms-1"}>Saiba mais</span>
            <span className={"ms-1 d-inline-flex"} style={{transform: "rotate(180deg)"}}>
              <i className="bi bi-arrow-up-short"></i>
            </span>
          </p>
        </summary>
        <div className={"p-0 mt-2 mb-0 text-balance"}>
          {
            (warning.text.endsWith('.')) ?
              Util.renderText(warning.text) :
              <>{Util.renderText(warning.text)}</>
          }
        </div>
      </details>
      <Button
        className={"m-0 p-0 bg-transparent border-0 text-warning-emphasis rounded-1"}
        style={{background: "unset", overflow: "unset", boxShadow: "unset"}}
        onClick={() => onDismiss(warning.id)}
      >
        <i className="bi bi-x-lg"></i>
      </Button>
    </div>
  );
};

WarningItem.propTypes = {
  warning: PropTypes.object.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default WarningItem;
