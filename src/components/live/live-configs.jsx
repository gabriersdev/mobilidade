import {Accordion, Form} from "react-bootstrap";
import PropTypes from "prop-types";

export function LiveConfigs({configs, setConfigs, labelsConfigs}) {
  const handleChange = ((e) => {
    const {id} = e.target;
    setConfigs(prev => {
      return {
        ...prev,
        [id]: e.target.checked
      }
    });
  });
  
  // Registrar configs em localstorage para persistência
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header className={"inter"}>Configurações</Accordion.Header>
        <Accordion.Body>
          <Form className={"d-flex align-items-center flex-wrap gap-4 mt-1"}>
            {
              typeof configs === "object" ? Object.entries(configs)
                .map((c, index) => {
                  return (
                    <Form.Check
                      key={index}
                      type="switch"
                      checked={c?.[1]}
                      onChange={handleChange}
                      id={c[0]}
                      label={labelsConfigs?.current?.[c[0]] ?? ("Configuração #" + index)}
                    />
                  )
                }) : ""
            }
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

LiveConfigs.propTypes = {
  configs: PropTypes.object.isRequired,
  setConfigs: PropTypes.any.isRequired,
  labelsConfigs: PropTypes.object.isRequired
}
