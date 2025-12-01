import {Accordion, Form, FormCheck, FormLabel} from "react-bootstrap";
import PropTypes from "prop-types";
import {useRef} from "react";

function FormControlElement({elementType, params}) {
  const label = useRef(
    <FormLabel className={(["check", "radio"].includes(elementType)) ? "d-none" : "m-0 p-0"}>{params.label}</FormLabel>
  )
  
  const content = useRef(<></>);
  if (elementType === "check") {
    content.current = (
      <FormCheck
        type="switch"
        {...params}
      />
    );
  } else if (elementType === "range") {
    content.current = (
      <div className={"d-inline-flex align-items-center gap-1"}>
        <Form.Range
          style={{maxWidth: "100px"}}
          {...params}
        />
        <span className={"text-sml text-muted"}>
          {
            params.value === 0 ? <>sem som</> : <>{params.value}%</>
          }
        </span>
      </div>
    )
  }
  
  if (label.current && content.current) {
    return (
      <div className={"d-inline-flex align-items-center gap-3 flex-wrap"}>
        {label.current}
        {content.current}
      </div>
    )
  }
  
  return <></>
}

export function LiveConfigs({configs, setConfigs, labelsConfigs}) {
  const handleChange = ((e) => {
    const {id, type} = e.target;
    let value;
    
    if (type === "checkbox" || type === "radio") value = e.target.checked;
    else if (type === "range") value = Math.round(+e.target.value);
    else value = e.target.value;
    
    console.log(value);
    
    setConfigs(prev => {
      return {
        ...prev,
        [id]: value
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
                    <FormControlElement
                      key={index}
                      elementType={typeof c?.[1] === "boolean" ? "check" : "range"}
                      params={{
                        id: c[0],
                        label: labelsConfigs?.current?.[c[0]] ?? ("Configuração #" + index),
                        value: typeof c?.[1] !== "boolean" ? c?.[1] : undefined,
                        checked: typeof c?.[1] === "boolean" ? c?.[1] : undefined,
                        onChange: handleChange,
                      }}
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

FormControlElement.propTypes = {
  elementType: PropTypes.string.isRequired,
  params: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
    checked: PropTypes.any,
    label: PropTypes.string.isRequired,
  })
}
