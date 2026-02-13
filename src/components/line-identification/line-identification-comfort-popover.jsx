import {Popover} from "react-bootstrap";
import PropTypes from "prop-types";
import {forwardRef} from "react";

const LineIdentificationComfortPopover = forwardRef(({aircon, teraflex, bench, fleet, conc, airsuspension, wifi, ...props}, ref) => (
  <Popover id="comfort-popover" ref={ref} {...props}>
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
));

LineIdentificationComfortPopover.displayName = "LineIdentificationComfortPopover";

LineIdentificationComfortPopover.propTypes = {
  aircon: PropTypes.oneOfType([PropTypes.bool, null, undefined, PropTypes.number]),
  teraflex: PropTypes.oneOfType([PropTypes.bool, null, undefined, PropTypes.number]),
  bench: PropTypes.oneOfType([PropTypes.bool, null, undefined, PropTypes.number]),
  fleet: PropTypes.oneOfType([PropTypes.bool, null, undefined, PropTypes.number]),
  conc: PropTypes.oneOfType([PropTypes.bool, null, undefined, PropTypes.number]),
  airsuspension: PropTypes.oneOfType([PropTypes.bool, null, undefined, PropTypes.number]),
  wifi: PropTypes.oneOfType([PropTypes.bool, null, undefined, PropTypes.number]),
}

export default LineIdentificationComfortPopover;
