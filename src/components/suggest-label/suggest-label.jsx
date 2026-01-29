import React from "react";
import {Link} from "react-router-dom";
import {reportMail} from "../../assets/resources.js";
import {Dropdown, DropdownItem, DropdownItemText, DropdownMenu, DropdownToggle, Tooltip, OverlayTrigger} from "react-bootstrap";
import useSuggestLabel from "./use-suggest-label.js";

export default function SuggestLabel() {
  const {
    stops,
    selectedStop,
    setSelectedStop,
    busTimes
  } = useSuggestLabel();
  
  return (
    <div>
      <div className={"bg-body-secondary px-2 py-1 rounded d-flex align-items-center justify-content-between gap-2"}>
        <div className={"text-body-secondary"}>
          <Dropdown>
            <DropdownToggle variant={"default"} className={"border-0 p-0 m-0 text-body-secondary line-clamp-w-200"}>
              <span className={"text-sml"}>{selectedStop ? selectedStop.label : "Selecione um ponto"}</span>
            </DropdownToggle>
            <DropdownMenu style={{maxHeight: "150px"}} className={"overflow-y-scroll"}>
              <DropdownItemText className={"text-sml text-body-secondary"}>
                Principais paradas ({stops.length})
              </DropdownItemText>
              
              {stops.map((stop) => (
                <DropdownItem 
                  key={stop.id} 
                  onClick={() => setSelectedStop(stop)}
                  className={"line-clamp-1"} 
                  style={{maxWidth: "300px"}}
                >
                  <OverlayTrigger overlay={
                    <Tooltip placement={"left-start"}>
                          <span className={"text-sml"}>
                            Endereço do ponto de parada
                          </span>
                    </Tooltip>
                  }>
                        <span>
                          {stop.label}
                        </span>
                  </OverlayTrigger>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        
        <div className={"d-flex gap-1 align-items-center text-sml"}>
          {busTimes.length > 0 ? (
            busTimes.map((busTime, index) => (
              <React.Fragment key={busTime.id}>
                <div className={""}>
                  <Link className={"text-body text-decoration-none"} to={busTime.link}>
                    <span>{busTime.label}</span>
                  </Link>
                </div>
                {index < busTimes.length - 1 && (
                  <span className={"fs-inherit text-body-tertiary"}>|</span>
                )}
              </React.Fragment>
            ))
          ) : (
            <span className="text-muted">Nenhum ônibus por perto</span>
          )}
        </div>
        
        <div>
          <Dropdown>
            <DropdownToggle size={"sm"} variant={"default"} className={"border-0 text-danger-emphasis d-flex align-items-center"}>
              <div className="live-indicator me-1">
                <div className="live-dot"></div>
              </div>
              <span className={"text-sml"}>Ao vivo</span>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem as={Link} to={`/live?sei=${selectedStop?.id}`}>Acompanhar as partidas deste ponto</DropdownItem>
              <DropdownItem as={Link} to="/live">Ir para a página de Ao vivo</DropdownItem>
              <DropdownItem as={Link} to={`/guide?sei=${selectedStop?.id}`}>Linhas que param neste ponto</DropdownItem>
              <DropdownItem as={Link} to={`mailto:${reportMail}`}>
                Reportar um problema
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}
