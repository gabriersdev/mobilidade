import {Alert, Button, Form, FormControl, FormGroup, FormLabel as BSFormLabel, FormSelect} from "react-bootstrap";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../config.js";

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
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState(null);

  const [propsInput] = useState({
    autoComplete: "off",
  });

  useEffect(() => {
    setError("");
    setFeedback("");
  }, [email, typeError, message]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar informações
    // TODO - Substituir o código do tipo de erro pelo nome do erro
    if (!email.trim() || !typeError.trim() || !message.trim()) {
      setError("Você precisa preencher todos os dados.");
    } else {
      // Lógica do envio dos dados
      axios.post(`http://localhost:8001/api/send-mail`, {
        recipientEmail: email.trim(),
        subject: typeError.trim(),
        codeMessage: "A4981412B7E1540091",
        body: `Tipo de erro: ${typeError.trim()}. Mensagem: ${message.trim()}`
      }).then(res => {
        console.log(res);
        setFeedback(<Alert className={"bg-success mb-0"}>Mensagem enviada com sucesso!</Alert>)
      }).catch(e => {
        console.error(e);
        alert("Não foi possível enviar a sua requisição. Tente novamente ou contacte o administrador.")
        setFeedback(<Alert className={"bg-danger mb-0"}>Não foi possível enviar a sua requisição. Tente novamente ou contacte o administrador.</Alert>)
      });
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
        error ? (
          <Alert className={"m-0 alert-danger"}>
            {error}
          </Alert>
        ) : ""
      }

      <div className={"mb-0 d-flex justify-content-end gap-2"}>
        <Button type={"button"} variant="secondary" className={"px-3 py-1"} onClick={handleCloseModal}>
          Cancelar
        </Button>
        <Button type={"submit"} variant="primary" className={"px-3 py-1"}>
          Enviar
        </Button>
      </div>

      {feedback ? feedback : ""}
    </Form>
  )
}

ReportForm.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
}

export default ReportForm;
