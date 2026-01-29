import moment from "moment";
import {Tooltip} from 'bootstrap';
import {Link} from "react-router-dom";
import {Popover, Badge, OverlayTrigger, ListGroup, ListGroupItem} from "react-bootstrap";
import {useContext, useEffect, useMemo, useRef, useState} from "react";

import Util from "../../assets/Util";
import Title from "../ui/title/title.jsx";
import Convert from "../../assets/Convert.js";
import {Context} from "../line/line-context.jsx";
import LineInfo from "../line-info/line-info.jsx";
import ReportModal from "../report/report-modal.jsx";
import MonitorModal from "../monitor/monitor-modal.jsx";
import SeeMore from "../../components/ui/see-more/see-more.jsx";
import LineIdentificationCompanyLogo from "./line-identification-company-logo.jsx";

moment.locale("pt-BR");

const LineIdentification = () => {
  const {line} = useContext(Context);
  const btnShareRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messageTooltip, setMessageTooltip] = useState("");
  const originalMessageTooltip = "Clique para copiar";
  
  useEffect(() => {
    console.groupCollapsed("[INFO] - Informações da linha");
    console.groupEnd();
  }, []);
  
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
  
  const lineType = line ? Convert.lineType(line.type) : '';
  const scope = line ? Convert.theScope(line.scope) : '';
  const accessibility = line?.accessibility ?? "";
  const aircon = line?.aircon ?? false;
  const teraflex = line?.teraflex ?? false;
  const bench = line?.bench ?? false;
  const fleet = line?.fleet ?? false;
  const airsuspension = line?.airsuspension ?? false;
  const wifi = line?.wifi ?? false;
  const conc = line?.conc ?? false;
  
  const hasIntegration = line?.has_integration === 1 ? "Possui integração" : "Não possui integração";
  
  const fare = line && parseFloat(line.fare) === 0 ? "Não informado" : Util.formatMoney(line?.fare)?.replace("R$", "BRL");
  
  const countDepartureTimes = line?.count_departure_times || 0;
  const reportContact = line?.report_contact;
  const datetimeLastModify = line?.datetime_last_modify
    ? new Date((moment(line.datetime_last_modify).add(-3, "h")).format("YYYY-MM-DD HH:mm:zz"))
    : null;
  
  const accessibilityPopover = useMemo(() => (
    <Popover id="accessibility-popover">
      <Popover.Header as="h3" className={"inter"}>Acessibilidade</Popover.Header>
      <Popover.Body className={"text-sml"}>
        Os ônibus são acessíveis: possuem elevador, assentos destinados ao público prioritário, chão em teraflex e as barras do ônibus tem cores que se contrastam, puxadores para os usuários e pelo menos uma porta exclusiva para a saída.
      </Popover.Body>
    </Popover>
  ), []);
  
  const comfortPopover = useMemo(() => (
    <Popover id="comfort-popover">
      <Popover.Header as="h3" className={"inter"}>Conforto</Popover.Header>
      <Popover.Body className={""}>
        <div>
          {
            [
              {text: "Ar-condicionado", has: aircon ?? false,},
              {text: "Assoalho em teraflex", has: teraflex ?? false,},
              {text: "Banco de encosto alto", has: bench ?? false,},
              {text: "Frota com menos de 10 anos", has: fleet ?? false,},
              {text: "Rastreável", has: conc ?? false,},
              {text: "Suspensão à ar", has: airsuspension ?? false,},
              {text: "Wifi", has: wifi ?? false,},
            ].map((item, index) => {
              return (
                <div className={"d-flex align-items-center flex-wrap gap-1 " + (item.has ? "text-primary" : "text-body-secondary text-decoration-line-through")} key={index}>
                  <i className="bi bi-check2 text-sml"></i>
                  <span className={"text-sml"}>{item.text}</span>
                </div>
              )
            })
          }
        </div>
      </Popover.Body>
    </Popover>
  ), [aircon, airsuspension, bench, fleet, teraflex, conc, wifi]);
  
  // TODO - implementar retorno ou verificação do banco de dados de integração
  const integrationPopover = useMemo(() => (
    // , 4992, 4685, 4687
    <Popover id="accessibility-popover" className={[4991].map(s => s.toString()).includes(line.line_number) ? "" : "d-none"}>
      <Popover.Header as="h3" className={"inter"}>Integração</Popover.Header>
      <Popover.Body className={"text-sml"}>
        <ListGroup className={"fs-inherit"}>
          <ListGroupItem className={"fs-inherit"}>
            <span className={"fs-inherit text-primary lh-base mb-1 d-block"}>4991 {"->"} Integração MOVE Metropolitano</span>
            <span className={"fs-inherit"}>BRL 8.80 (tarifa da linha 4991) + BRL 0.15 na integração.</span>
          </ListGroupItem>
          <ListGroupItem className={"fs-inherit"}>
            <span className={"fs-inherit text-primary lh-base"}>4991 {"->"} TREM Belo Horizonte</span><br/>
            Não possui integração.
          </ListGroupItem>
        </ListGroup>
      </Popover.Body>
    </Popover>
  ), []);
  
  if (!line) return null;
  
  return (
    <div className="d-flex flex-column">
      <div className={"d-flex align-items-start flex-wrap gap-3 justify-content-between flex-column flex-column-reverse flex-lg-row"}>
        <div>
          <hgroup className="d-flex align-items-center gap-2 flex-wrap mb-0">
            <h1 className={"d-none"}>Linha {line.line_number} - {line.departure_location} para {line.destination_location}</h1>
            <Title type="h2" classX=" fs-2 d-inline text-body-emphasis m-0 p-0">Linha {line.line_number}</Title>
            <span className="text-body-secondary">|</span>
            <Title type="h2" classX=" fs-2 d-inline text-body-secondary m-0 p-0 lh-sm">{line.departure_location} ⇄ {line.destination_location}</Title>
          </hgroup>
          {
            line.line_name.toLowerCase() !== line.departure_location.toLowerCase() + "/" + line.destination_location.toLowerCase() ? (
              <span className={"d-block mb-5 mt-3 mt-md-2 text-body-secondary"}>{line.line_name.replace(/\//, " ⇄ ") || ""}</span>
            ) : (
              <div className={"my-2"}></div>
            )
          }
        </div>
        
        <LineIdentificationCompanyLogo companyId={line.company_id}/>
      </div>
      
      <SeeMore mobileOnly={true} height={200}>
        <div className={"d-flex flex-column gap-3 mt-5"}>
          <div className="d-flex align-items-center gap-3 flex-wrap order-1" style={{maxWidth: "600px"}}>
            <Link className={"text-decoration-none"} to={"/search/?term=" + (
              lineType.toLowerCase().includes("executivo") || lineType.toLowerCase().includes("seletivo") ? "bandeirante" :
                lineType.toLowerCase().includes("coletivo") ? "coletivo" : lineType
            )}>
              <LineInfo label={{ref: 'Tipo da Linha', value: lineType}}>
                <i className="bi bi-record-circle red"></i>
              </LineInfo>
            </Link>
            <Link className={"text-decoration-none"} to={"/search/?term=" + scope}>
              <LineInfo label={{ref: 'Grupo de atendimento', value: scope}}>
                <i className="bi bi-building red"></i>
              </LineInfo>
            </Link>
            
            <OverlayTrigger trigger="click" placement="auto" overlay={integrationPopover}>
              <div className={"d-flex align-items-center flex-wrap gap-1 cursor-pointer"}>
                <LineInfo label={{ref: 'Integração com outras Linhas ou Modais', value: hasIntegration}}>
                  <i className="bi bi-train-front-fill purple"></i>
                </LineInfo>
                <span className="text-body-tertiary bg-body-secondary rounded-circle text-sml font-monospace " style={{padding: "1px 0.5rem"}}>i</span>
              </div>
            </OverlayTrigger>
            
            {
              accessibility === 1 && (
                <OverlayTrigger trigger="click" placement="auto" overlay={accessibilityPopover}>
                  <div className={"d-flex align-items-center flex-wrap gap-1 cursor-pointer"}>
                    <i className="bi bi-person-wheelchair text-warning"></i>
                    Acessível
                    <span className="text-body-tertiary bg-body-secondary rounded-circle text-sml font-monospace " style={{padding: "1px 0.5rem"}}>i</span>
                  </div>
                </OverlayTrigger>
              )
            }
            
            <OverlayTrigger trigger="click" placement="auto" overlay={comfortPopover}>
              <div className={"d-flex align-items-center flex-wrap gap-1 cursor-pointer"}>
                <i className="bi bi-star-fill text-primary"></i>
                Confortável
                <span className="text-body-tertiary bg-body-secondary rounded-circle text-sml font-monospace " style={{padding: "1px 0.5rem"}}>i</span>
              </div>
            </OverlayTrigger>
            
            <LineInfo label={{ref: 'Tarifa', value: fare}}>
              <i className="bi bi-cash-coin naval-blue"></i>
            </LineInfo>
            <Link to={`/company/${line.company_id}`} className={"text-decoration-none"}>
              <LineInfo label={{ref: 'Companhia', value: line.company_name}}>
                <i className="bi bi-buildings green-sheets"></i>
              </LineInfo>
            </Link>
            <Link className={"text-decoration-none text-body"} to={"#partidas"}>
              <LineInfo label={{ref: "Horários", value: ""}}>
                <i className="bi bi-calendar-date d-inline-block"></i>
                <span className={"ms-2"}>{countDepartureTimes.toLocaleString() || "Nenhuma"} {countDepartureTimes > 1 ? "partidas" : "partida"}</span>
              </LineInfo>
            </Link>
          </div>
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
            
            <Badge className={"rounded-5 bg-primary-subtle p-0"}>
              <button
                ref={btnShareRef}
                className={"btn pv-05 m-0 border-0 px-2 py-1 d-inline-block text-body text-decoration-none d-flex gap-2 border-0 outline-none"}
                style={{lineHeight: "normal"}}
                onClick={async () => {
                  if (navigator.share) {
                    try {
                      await navigator.share({
                        title: document.title || `Linha ${line.line_number} | ${line.line_name}`,
                        text: "Confira as informações da linha: horários de partida, pontos de recarga e parada, valor da tarifa, integração, compania entre outros.",
                        url: window.location.href
                      });
                      console.log("Conteúdo compartilhado com sucesso!");
                    } catch (error) {
                      // if (!error.toString().includes("Share canceled")) alert("Erro ao compartilhar:" + error);
                      console.log(error.toString());
                    }
                  } else {
                    await navigator.clipboard.writeText(window.location.href);
                    
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
                <i className="bi bi-share"></i>
              </button>
            </Badge>
          </div>
          <div className="d-flex align-items-center gap-3 flex-wrap order-2">
            {
              datetimeLastModify && (<div className={"d-flex align-items-center gap-3 flex-wrap"}>
                <LineInfo label={{ref: 'Última atualização', value: ""}}>
                  <i className="bi bi-stopwatch"></i>
                  <span className={"ms-1"}>Infos. atualizadas {Util.renderText(Util.diffToHuman(datetimeLastModify))}</span>
                </LineInfo>
              </div>)
            }
          </div>
        </div>
      </SeeMore>
    </div>
  )
}

export default LineIdentification;
