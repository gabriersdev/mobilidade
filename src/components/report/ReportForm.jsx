import {Alert, Button, Form, FormControl, FormGroup, FormLabel as BSFormLabel, FormSelect} from "react-bootstrap";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";

const FormLabel = ({props, children}) => {
  return <BSFormLabel component="label" column="sm" className="fs-6 m-0 p-0 mb-2" {...props}>{children}</BSFormLabel>
}

FormLabel.propTypes = {
  props: PropTypes.shape({}),
  children: PropTypes.node.isRequired
}

const ReportForm = ({handleCloseModal}) => {
  const [email, setEmail] = useState("");
  const [typeError, setTypeError] = useState("");
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("XXXXXXXXX");

  const [propsInput] = useState({
    autoComplete: "off",
  });

  useEffect(() => {
    setFeedback("");
  }, [email, typeError, message]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar informações
    if (!email.trim() || !typeError.trim() || !message.trim()) {
      setFeedback("Você precisa preencher todos os dados.");
    } else {
      // Lógica do envio dos dados
      alert("Enviado!")
    }

  }

  return (
    <Form onSubmit={handleSubmit} className={"mb-0 d-flex flex-column gap-3"}>
      <FormGroup>
        <FormLabel props={{htmlFor: "type-error"}}>Qual o erro?</FormLabel>
        <FormSelect required={true} id={"type-error"} value={typeError} onChange={(e) => setTypeError(e.target.value)}>
          <option value="">Selecione</option>
          <option value={1}>Horário errado</option>
          <option value={2}>Itinerário (pontos de paradas) errado</option>
          <option value={3}>Pontos de recarga errado</option>
          <option value={4}>Erro no carregamento do site</option>
          <option value={5}>Travamento</option>
          <option value={6}>Dados da companhia errado</option>
          <option value={7}>Outros</option>
        </FormSelect>
      </FormGroup>
      <FormGroup>
        <FormLabel props={{htmlFor: "mail"}}>E-mail</FormLabel>
        <FormControl type={"email"} id={"mail"} className={"mb-0"} required={true} value={email}
                     onChange={(e) => setEmail(e.target.value)} {...propsInput}/>
      </FormGroup>
      <FormGroup>
        <FormLabel props={{htmlFor: "error-message"}}>Descreva o erro</FormLabel>
        <Form.Control as="textarea" className={"resize-none"} rows={"5"} id={"error-message"} value={message}
                      onChange={(e) => setMessage(e.target.value)}/>
      </FormGroup>

      {
        feedback ? (
          <Alert bsStyle="danger" className={"m-0 alert-danger"}>
            {feedback}
          </Alert>
        ) : ""
      }

      <div className={"mb-0 d-flex justify-content-end gap-1"}>
        <Button type={"button"} variant="secondary" className={"px-3 py-1"} onClick={handleCloseModal}>
          Cancelar
        </Button>
        <Button type={"submit"} variant="primary" className={"px-3 py-1"}>
          Enviar
        </Button>
      </div>
    </Form>
  )
}

ReportForm.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
}

export default ReportForm;
