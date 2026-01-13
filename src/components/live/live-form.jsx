import {FormGroup, FormLabel} from "react-bootstrap";

import GenericCombobox from "../ui/comboBox/combo-box.jsx";
import AnimatedComponents from "../ui/animated-component/animated-components.jsx";
import PropTypes from "prop-types";

export function LiveFormLines({lines, setLineSelected}) {
  return (
    <div className={"d-none"}>
      <AnimatedComponents>
        <FormGroup>
          <FormLabel column={"lg"} className={"w-100"}>
            <GenericCombobox
              items={lines}
              itemToString={(item) => (item ? item.name : '')}
              onSelectedItemChange={setLineSelected}
              label="Linha"
              placeholder="Selecione uma linha"
              required={false}
            />
          </FormLabel>
        </FormGroup>
      </AnimatedComponents>
    </div>
  )
}

export function LiveFormDeparturePoints({departurePoints, setDeparturePointSelected}) {
  return (
    <AnimatedComponents>
      <FormGroup>
        <FormLabel column={"lg"} className={"w-100"}>
          <GenericCombobox
            items={departurePoints}
            itemToString={(item) => (item ? item.name : '')}
            onSelectedItemChange={setDeparturePointSelected}
            label="Ponto de parada"
            placeholder="Selecione um ponto"
            required={true}
          />
        </FormLabel>
      </FormGroup>
    </AnimatedComponents>
  )
}

LiveFormLines.propTypes = {
  lines: PropTypes.array.isRequired,
  setLineSelected: PropTypes.func.isRequired
}

LiveFormDeparturePoints.propTypes = {
  departurePoints: PropTypes.array.isRequired,
  setDeparturePointSelected: PropTypes.func.isRequired
}

