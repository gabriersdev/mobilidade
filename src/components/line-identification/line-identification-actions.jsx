import {Link} from "react-router-dom";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "react-bootstrap";
import PropTypes from "prop-types";

import MonitorModal from "@/components/monitor/monitor-modal.jsx";
import LineIdentificationShareButton from "./line-identification-share-button.jsx";
import ReportIncidentModal from "@/components/report/report-incident-modal.jsx";
import ReportBugModal from "@/components/report/report-bug-modal.jsx";

const LineIdentificationActions = ({reportContact, line}) => {
  return (
    <div className="d-flex align-items-center gap-2 flex-wrap order-3">
      <LineIdentificationShareButton line={line}/>
      <MonitorModal/>
      
      {
        reportContact && (
          <Link
            className={"outline-none"}
            to={reportContact || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size={"sm"}
              variant={"warning"}
            >
              <span className={"me-1"}>Reclamar</span>
              <i className="bi bi-arrow-up-right-square"></i>
            </Button>
          </Link>
        )
      }
      
      <Link
        className={"outline-none d-none"}
        to={"#"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          size={"sm"}
          variant={"secondary"}
        >
          <div className={"d-inline-flex align-items-center gap-1"}>
            <div className="live-indicator">
              <div className="live-dot"></div>
            </div>
            <span>Linha ao vivo</span>
          </div>
        </Button>
      </Link>
      
      <Dropdown>
        <DropdownToggle
          variant={"secondary"}
          size={"sm"}
        >
          <span>Reportar</span>
        </DropdownToggle>
        
        <DropdownMenu>
          <DropdownItem>
            <ReportBugModal/>
          </DropdownItem>
          <DropdownItem>
            <ReportIncidentModal/>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

LineIdentificationActions.propTypes = {
  reportContact: PropTypes.string,
  line: PropTypes.object
}

export default LineIdentificationActions;
