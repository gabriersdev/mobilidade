import {Link} from "react-router-dom";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "react-bootstrap";
import PropTypes from "prop-types";

import ReportIncidentModal from "@/components/report/report-incident-modal.jsx";
import ReportBugModal from "@/components/report/report-bug-modal.jsx";
import BusShareButton from "./bus-share-button.jsx";

const BusDetailsActions = ({vehicle}) => {
  return (
    <div className="d-flex align-items-center gap-2 flex-wrap mt-2">
      <BusShareButton vehicle={vehicle}/>
      
      {
        vehicle.company?.reportContact && (
          <Link
            className={"outline-none"}
            to={vehicle.company.reportContact || "#"}
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

BusDetailsActions.propTypes = {
  vehicle: PropTypes.object.isRequired
};

export default BusDetailsActions;
