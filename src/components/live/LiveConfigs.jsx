import {Accordion, Form} from "react-bootstrap";
import PropTypes from "prop-types";

export function LiveConfigs({configs, setConfigs}) {
  const handleChange = ((e) => {
    const {id} = e.target;
    setConfigs(prev => {
      return {
        ...prev,
        [id]: e.target.checked
      }
    });
  });
  
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header className={"inter"}>Configurações</Accordion.Header>
        <Accordion.Body>
          <Form className={"d-flex align-items-center flex-wrap gap-4 mt-1"}>
            <Form.Check
              type="switch"
              checked={configs?.["warningSound"]}
              onChange={handleChange}
              id="warningSound"
              label="Aviso sonoro"
            />
            <Form.Check
              type="switch"
              checked={configs?.["showSomeDepartureStart"]}
              onChange={handleChange}
              id="showSomeDepartureStart"
              label="Exibir apenas partidas"
            />
            <Form.Check
              type="switch"
              checked={configs?.["showAdditionalInfo"]}
              onChange={handleChange}
              id="showAdditionalInfo"
              label="Exibir informações extras"
            />
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

LiveConfigs.propTypes = {
  configs: PropTypes.object.isRequired,
  setConfigs: PropTypes.any.isRequired
}
