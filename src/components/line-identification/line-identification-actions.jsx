import {Link} from "react-router-dom";
import {Badge} from "react-bootstrap";
import ReportModal from "../report/report-modal.jsx";
import MonitorModal from "../monitor/monitor-modal.jsx";
import LineIdentificationShareButton from "./line-identification-share-button.jsx";
import PropTypes from "prop-types";

const LineIdentificationActions = ({reportContact, line}) => {
  return (
    <div className="d-flex align-items-center gap-2 flex-wrap order-3">
      {
        reportContact ? (
          <Badge className={"rounded-5 bg-warning p-0"}>
            <Link className={"btn pv-05 d-inline-block text-black text-decoration-none border-0 outline-none"} to={reportContact || "#"} target="_blank" rel="noopener noreferrer">
              <span className={"me-1"}>Reclamar</span>
              <i className="bi bi-arrow-up-right-square"></i>
            </Link>
          </Badge>
        ) : ""
      }

      <ReportModal/>
      <MonitorModal/>

      <LineIdentificationShareButton line={line} />
    </div>
  );
};

LineIdentificationActions.propTypes = {
  reportContact: PropTypes.string,
  line: PropTypes.object
}

export default LineIdentificationActions;
