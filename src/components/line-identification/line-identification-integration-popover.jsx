import {Button, ListGroup, ListGroupItem, Popover} from "react-bootstrap";
import {Link} from "react-router-dom";
import {currentTableFares, linesWithManualIntegration} from "../../assets/resources.js";
import {forwardRef} from "react";

const LineIdentificationIntegrationPopover = forwardRef(({line, ...props}, ref) => {
  const lineHaveAIntegration = [...linesWithManualIntegration].map(s => s.toString()).includes(line.line_number);

  if (!lineHaveAIntegration) return (
    <Popover id="no-accessibility-popover" ref={ref} {...props}>
      <Popover.Header as="h3" className={"inter"}>Integração</Popover.Header>
      <Popover.Body className={"text-sml"}>
        Esta linha não possui integração. Isso significa que, se você precisar fazer baldeação para chegar ao seu destino, precisará desembolsar o valor integral da passagem.
      </Popover.Body>
    </Popover>
  )

  return (
    <Popover id="accessibility-popover" ref={ref} {...props}>
      <Popover.Header as="h3" className={"inter"}>Integração</Popover.Header>
      <Popover.Body className={"text-sml"}>
        <ListGroup className={"fs-inherit"}>
          <ListGroupItem className={"fs-inherit"}>
            <span className={"fs-inherit text-primary lh-base mb-1 d-block"}>4991 {"->"} Integração MOVE Metropolitano</span>
            <span className={"fs-inherit"}>BRL 8,80 (tarifa da linha 4991) + BRL 0,15 na integração.</span>
          </ListGroupItem>
          <ListGroupItem className={"fs-inherit"}>
            <span className={"fs-inherit text-primary lh-base"}>4991 {"->"} TREM Belo Horizonte</span><br/>
            Não possui integração.
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

LineIdentificationIntegrationPopover.displayName = "LineIdentificationIntegrationPopover";

export default LineIdentificationIntegrationPopover;
