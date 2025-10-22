import PropTypes from "prop-types";

import Title from "../title/Title";
import LineInfo from "../lineInfo/LineInfo";
import {Link} from "react-router-dom";
import {Badge} from "react-bootstrap";
import ReportModal from "../report/ReportModal.jsx";
import Util from "../../assets/Util.jsx";
import Convert from "./convert.js";
import MonitorModal from "../monitor/MonitorModal.jsx";

import {Tooltip} from 'bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {useEffect, useRef, useState} from "react";

const LineIdentification = ({line}) => {
  let [lineType, scope, hasIntegration, fare, countDepartureTimes, reportContact, datetimeLastModify, accessibility, aircon, teraflex, bench, fleet, airsuspension] = ['', '', '', 0, '', '', 0, 0, 0, 0, 0, 0];
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
  
  lineType = Convert.lineType(line.type);
  scope = Convert.theScope(line.scope);
  accessibility = line?.accessibility ?? ""
  aircon = line?.aircon ?? false;
  teraflex = line?.teraflex ?? false;
  bench = line?.bench ?? false;
  fleet = line?.fleet ?? false;
  airsuspension = line?.airsuspension ?? false;
  
  if (line.has_integration === 1) hasIntegration = "Possui integração";
  else hasIntegration = "Não possui integração";
  
  if (parseFloat(line.fare) === 0) fare = "Não informado";
  else fare = Util.formatMoney(line.fare);
  
  if (line.count_departure_times) countDepartureTimes = line.count_departure_times;
  if (line.report_contact) reportContact = line.report_contact;
  if (line.datetime_last_modify) datetimeLastModify = new Date(line.datetime_last_modify || '2021-01-01T00:00:00Z');
  
  const accessibilityPopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3" className={"inter"}>Acessibilidade</Popover.Header>
      <Popover.Body className={"text-sml"}>
        Os ônibus são acessíveis: possuem elevador; assentos destinados ao público prioritário; assentos, chão e as barras do ônibus tem cores que se contrastam, barras e puxadores para os usuários e pelo menos uma porta exclusiva para a saída.
      </Popover.Body>
    </Popover>
  );
  
  const comfortPopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3" className={"inter"}>Conforto</Popover.Header>
      <Popover.Body className={""}>
        <div>
          {
            [
              {text: "Ar-condicionado", has: aircon ?? false,},
              {text: "Assoalho em teraflex", has: teraflex ?? false,},
              {text: "Banco de encosto alto", has: bench ?? false,},
              {text: "Frota com menos de 10 anos", has: fleet ?? false,},
              {text: "Suspensão à ar", has: airsuspension ?? false,},
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
  );
  
  return (
    <div className="d-flex flex-column gap-3">
      <hgroup className="d-flex align-items-center gap-2 flex-wrap mb-0">
        <h1 className={"d-none"}>Linha {line.line_number} - {line.departure_location} para {line.destination_location}</h1>
        <Title type="h2" classX=" fs-2 d-inline text-body-emphasis m-0 p-0">Linha {line.line_number}</Title>
        <span className="text-body-secondary">|</span>
        <Title type="h2" classX=" fs-2 d-inline text-body-secondary m-0 p-0 lh-sm">{line.departure_location} -{">"} {line.destination_location}</Title>
      </hgroup>
      {
        line.line_name.toLowerCase() !== line.departure_location.toLowerCase() + "/" + line.destination_location.toLowerCase() ? (
          <span className={"d-block mb-5 text-body-secondary"}>{line.line_name.replace(/\//, " -> ") || ""}</span>
        ) : (
          <div className={"my-2"}></div>
        )
      }
      
      <div className={"d-flex flex-column"}>
        <div className="d-flex align-items-center gap-3 flex-wrap mb-3 order-0">
          <LineInfo label={{ref: 'Tipo da Linha', value: lineType}}>
            <i className="bi bi-record-circle red"></i>
          </LineInfo>
          <LineInfo label={{ref: 'Grupo de atendimento', value: scope}}>
            <i className="bi bi-building red"></i>
          </LineInfo>
          <LineInfo label={{ref: 'Integração com outras Linhas ou Modais', value: hasIntegration}}>
            <i className="bi bi-train-front-fill purple"></i>
          </LineInfo>
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
        </div>
        <div className="d-flex align-items-center gap-2 flex-wrap mb-3 order-3">
          {
            reportContact ? (
              <Badge className={"fw-normal rounded-5 bg-warning p-0"}>
                <Link className={"btn pv-05 d-inline-block text-black text-decoration-none border-0 outline-none"} to={reportContact || "#"} target="_blank" rel="noopener noreferrer">
                  <span className={"me-1"}>Reclamar</span>
                  <i className="bi bi-arrow-up-right-square"></i>
                </Link>
              </Badge>
            ) : ""
          }
          
          <ReportModal/>
          <MonitorModal/>
          
          <div>
            <Badge className={"fw-normal rounded-5 bg-primary-subtle p-0"}>
              <button
                ref={btnShareRef}
                title={originalMessageTooltip}
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
                      setMessageTooltip("Copiado!")
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
        </div>
        <div className="d-flex align-items-center gap-3 flex-wrap mb-3 order-1">
          <LineInfo label={{ref: 'Tarifa', value: fare}}>
            <i className="bi bi-cash-coin naval-blue"></i>
          </LineInfo>
          <Link to={`/company/${line.company_id}`} className={"text-decoration-none"}>
            <LineInfo label={{ref: 'Companhia', value: line.company_name}}>
              <i className="bi bi-buildings green-sheets"></i>
            </LineInfo>
          </Link>
          <LineInfo label={{ref: "Horários", value: ""}}>
            <i className="bi bi-calendar-date d-inline-block"></i>
            <span
              className={"ms-2"}>{countDepartureTimes.toLocaleString() || "Nenhuma"} {countDepartureTimes > 1 ? "partidas" : "partida"}
            </span>
          </LineInfo>
        </div>
        <div className="d-flex align-items-center gap-3 flex-wrap mb-3 order-2">
          {
            datetimeLastModify ? (
                <div className={"d-flex align-items-center gap-3 flex-wrap"}>
                  <LineInfo label={{ref: 'Última atualização', value: ""}}>
                    <i className="bi bi-stopwatch"></i>
                    <span className={"ms-1"}>
                    Atualizado em:{" "}
                      {
                        [
                          (0 + datetimeLastModify.toLocaleString('pt-BR', {day: 'numeric'})).slice(-2),
                          datetimeLastModify.toLocaleString('pt-BR', {month: 'long'}),
                          (0 + datetimeLastModify.toLocaleString('pt-BR', {year: 'numeric'})).slice(-4),
                        ].join(" de ")
                      }
                  </span>
                  </LineInfo>
                </div>
              )
              : ""}
        </div>
      </div>
    </div>
  )
}

LineIdentification.propTypes = {
  line: PropTypes.shape({
    line_number: PropTypes.string.isRequired,
    line_name: PropTypes.string.isRequired,
    departure_location: PropTypes.string.isRequired,
    destination_location: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    company_id: PropTypes.number.isRequired,
    fare: PropTypes.string.isRequired,
    has_integration: PropTypes.number.isRequired,
    scope: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
    count_departure_times: PropTypes.number.isRequired,
    report_contact: PropTypes.string,
    datetime_last_modify: PropTypes.string,
    accessibility: PropTypes.number,
    aircon: PropTypes.number,
    teraflex: PropTypes.number,
    bench: PropTypes.number,
    fleet: PropTypes.number,
    airsuspension: PropTypes.number,
  }).isRequired
}

export default LineIdentification;
