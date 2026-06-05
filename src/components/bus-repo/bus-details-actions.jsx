import {Link} from "react-router-dom";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "react-bootstrap";
import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
import {Tooltip} from "bootstrap";

import ReportIncidentModal from "@/components/report/report-incident-modal.jsx";
import ReportBugModal from "@/components/report/report-bug-modal.jsx";

const BusShareButton = ({vehicle}) => {
  const btnShareRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messageTooltip, setMessageTooltip] = useState("");
  const originalMessageTooltip = "Clique para copiar";
  
  useEffect(() => {
    if (btnShareRef.current && showTooltip) {
      btnShareRef.current.title = messageTooltip;
      const tooltip = new Tooltip(btnShareRef.current);
      
      tooltip.show();
      
      const timer = setTimeout(() => {
        tooltip.dispose();
        tooltip.hide();
        btnShareRef.current.title = originalMessageTooltip;
        setShowTooltip(false);
      }, 2000);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showTooltip]);
  
  return (
    <Button
      variant={"info"}
      size={"sm"}
      className={"d-inline-flex gap-1 align-items-center"}
      ref={btnShareRef}
      onClick={async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: document.title || `Ônibus ${vehicle.licensePlate}`,
              text: `Confira as informações do veículo placa ${vehicle.licensePlate}, frota ${vehicle.fleetNumber} da empresa ${vehicle.company.name}.`,
              url: window.location.href
            });
            console.log("Conteúdo compartilhado com sucesso!");
          } catch (error) {
            console.log(error.toString());
          }
        } else {
          const instanceURL = new URL(window.location);
          await navigator.clipboard.writeText(`${instanceURL.origin}${instanceURL.pathname}`);
          
          if (Notification.permission === "granted") {
            setMessageTooltip("Link copiado!")
            setShowTooltip(true);
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
              if (permission === "granted") {
                new Notification("Link copiado!");
              }
            });
          }
        }
      }}
    >
      <span>Compartilhar</span>
      <i className="bi bi-share text-sml"></i>
    </Button>
  );
};

BusShareButton.propTypes = {
  vehicle: PropTypes.object
}

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
