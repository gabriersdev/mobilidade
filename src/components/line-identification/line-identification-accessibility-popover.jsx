import {Popover} from "react-bootstrap";
import {forwardRef} from "react";

const LineIdentificationAccessibilityPopover = forwardRef((props, ref) => (
  <Popover id="accessibility-popover" ref={ref} {...props}>
    <Popover.Header as="h3" className={"inter"}>Acessibilidade</Popover.Header>
    <Popover.Body className={"text-sml"}>
      Os ônibus são acessíveis: possuem elevador, assentos destinados ao público prioritário, chão em teraflex e as barras do ônibus tem cores que se contrastam, puxadores para os usuários e pelo menos uma porta exclusiva para a saída.
    </Popover.Body>
  </Popover>
));

LineIdentificationAccessibilityPopover.displayName = "LineIdentificationAccessibilityPopover";

export default LineIdentificationAccessibilityPopover;
