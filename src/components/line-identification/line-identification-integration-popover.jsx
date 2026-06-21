import {Button, ListGroup, ListGroupItem, Popover} from "react-bootstrap";
import {Link} from "react-router-dom";
import {currentTableFares, linesWithManualIntegration} from "@/assets/resources.js";
import {forwardRef} from "react";
import PropTypes from "prop-types";

const LineIdentificationIntegrationPopover = forwardRef(({line, ...props}, ref) => {
  const lineHaveAIntegration = [...linesWithManualIntegration].map(s => s.toString()).includes(line.line_number);
  
  if (!lineHaveAIntegration) return (
    <Popover id="no-accessibility-popover" ref={ref} {...props}>
      <Popover.Header as="h3" className={"inter"}>Integração</Popover.Header>
      <Popover.Body className={"text-sml"}>
        Esta linha não possui integração. Isso significa que, se você precisar fazer baldeação para chegar ao seu destino, precisará desembolsar o valor integral de ambas as passagens.
      </Popover.Body>
    </Popover>
  )
  
  return (
    <Popover id="accessibility-popover" ref={ref} {...props}>
      <Popover.Header as="h3" className={"inter"}>Integração</Popover.Header>
      <Popover.Body className={"text-sml"}>
        <ListGroup className={"fs-inherit"}>
          <ListGroupItem className={"fs-inherit"}>
            <span className={"fs-inherit text-primary lh-base mb-2 d-block"}>Linha atual {"->"} Integração MOVE Metropolitano exceto Conexão Aeroporto</span>
            <span className={"fs-inherit"}>Valor à pagar na integração = BRL 8,95 - Tarifa atual</span>
          </ListGroupItem>
          <ListGroupItem className={"fs-inherit"}>
            <span className={"fs-inherit text-primary lh-base mb-2 d-block"}>Linha atual {"->"} Outra linha metropolitana de RIT diferente</span>
            <span className={"fs-inherit"}>Aprox. 50% de desconto na tarifa da linha de destino.</span>
          </ListGroupItem>
          <ListGroupItem className={"fs-inherit"}>
            <span className={"fs-inherit text-primary lh-base mb-2 d-block"}>Linha atual {"->"} Metrô (trem) Belo Horizonte</span>
            <Link to={currentTableFares} rel={"noreferrer noopener"} target={"_blank"} className={"fs-inherit"}>
              <span className={"fs-inherit"}>Consulte a tabela de tarifas</span>
            </Link>
          </ListGroupItem>
        </ListGroup>
        
        <Link to={currentTableFares} rel={"noreferrer noopener"} target={"_blank"} className={"mt-2 d-block"}>
          <Button size={"sm"} className={"text-sml"}>
            Tabela de tarifas <span className={"fs-inherit d-inline-block"} style={{rotate: "-45deg", marginBottom: "1.15px"}}>{"->"}</span>
          </Button>
        </Link>
      </Popover.Body>
    </Popover>
  )
});

LineIdentificationIntegrationPopover.propTypes = {
  line: PropTypes.object
}

LineIdentificationIntegrationPopover.displayName = "LineIdentificationIntegrationPopover";

export default LineIdentificationIntegrationPopover;
