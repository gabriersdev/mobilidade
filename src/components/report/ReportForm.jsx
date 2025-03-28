import {Alert, Button, Form, FormControl, FormGroup, FormLabel as BSFormLabel, FormSelect} from "react-bootstrap";

import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";
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
  const [verificationCode, setVerificationCode] = useState("");
  const [codeIsSent, setCodeIsSent] = useState(false);
  const [messageId, setMessageId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [allOK, setAllOK] = useState(false);
  
  const btnCancel = useRef(null);
  const inputVerificationCode = useRef(null);
  
  const [propsInput] = useState({
    autoComplete: "off",
  });
  
  useEffect(() => {
    setError("");
    setFeedback("");
  }, [email, typeError, message]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLoading) {
      alert("Já estamos processando o envio do formulário. Por favor, aguarde um instante.")
    }
    
    if (codeIsSent) {
      if (!verificationCode.trim()) {
        setError("Preencha o código de verificação");
        return;
      } else if (!messageId) {
        setError("O parâmetro não foi definido. Contate o administrador")
        return;
      }
      
      setIsLoading(true);
      
      axios.post(`${config.host}/api/verify-code/`, {
        messageId: messageId,
        code: verificationCode
      }).then(res => {
        const ret = res.data
        
        if (ret.res === 200) {
          const successMess = "Tudo certo! Seu reporte foi enviado com sucesso e será verificado pela nossa equipe. Obrigado!"
          setFeedback(<Alert className="alert-success mb-0">{successMess}</Alert>)
          
          alert(successMess);
          
          setVerificationCode("");
          setAllOK(true);
          
          setTimeout(() => {
            setEmail("");
            setTypeError("");
            setMessage("");
          }, 2000);
          
          if (btnCancel.current) btnCancel.current.focus();
          
          return;
        }
        
        setFeedback(<Alert className="alert-danger mb-0">{ret.message || "Algo não saiu como deveria. Tente novamente."}</Alert>)
      }).catch(e => {
        console.error(e);
        alert("Não foi possível enviar a sua requisição. Tente novamente ou contacte o administrador.")
        setFeedback(<Alert className={"alert-danger mb-0"}>Não foi possível enviar a sua requisição. Tente novamente ou contacte o administrador.</Alert>)
      }).finally(() => setIsLoading(false));
      
      return;
    }
    
    // Validar informações
    if (!email.trim() || !typeError.trim() || !message.trim()) {
      setError("Você precisa preencher todos os dados.");
      setCodeIsSent(false);
    } else {
      setIsLoading(true);
      
      // Lógica do envio dos dados
      axios.post(`${config.host}/api/report/`, {
        email: email.trim(),
        typeError: typeError.trim(),
        message: message.trim(),
        page: window.location.pathname
      }).then(res => {
        // console.log(res);
        setFeedback(<Alert className={"alert-info mb-0"}>Um código foi enviado para o seu e-mail.</Alert>)
        setMessageId(res.data.insertId)
        setCodeIsSent(true)
        if (inputVerificationCode.current) inputVerificationCode.current.focus();
      }).catch(e => {
        console.error(e);
        alert("Não foi possível enviar a sua requisição. Tente novamente ou contacte o administrador.")
        setFeedback(<Alert className={"alert-danger mb-0"}>Não foi possível enviar a sua requisição. Tente novamente ou contacte o administrador.</Alert>)
        setCodeIsSent(false)
      }).finally(() => setIsLoading(false));
    }
  }
  
  return (
    <Form onSubmit={handleSubmit} className={"mb-0 d-flex flex-column gap-3"}>
      {
        !codeIsSent ? (
          <>
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
              <FormControl type={"email"} id={"mail"} className={"mb-0"} required={true} value={email} onChange={(e) => setEmail(e.target.value)} {...propsInput} maxLength={100}/>
            </FormGroup>
            <FormGroup>
              <FormLabel props={{htmlFor: "error-message"}}>Descreva o erro</FormLabel>
              <Form.Control as="textarea" className={"resize-none"} rows={"5"} id={"error-message"} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={200}/>
            </FormGroup>
          </>
        ) :
          !setAllOK ? (
            <>
              <FormGroup>
                <FormLabel props={{htmlFor: "verification-code"}}>Código de verificação</FormLabel>
                <FormControl type={"number"} id={"verification-code"} {...propsInput} value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} mask={"999999"} {...propsInput} ref={inputVerificationCode}/>
              </FormGroup>
            </>
          ) : ""
      }
      
      <div className={"mb-0 d-flex flex-column justify-content-end gap-2"}>
        {error ? (<Alert className={"m-0 alert-danger"}>{error}</Alert>) : ""}
        {feedback ? <>{feedback}</> : ""}
      </div>
      
      <div className={"mb-0 d-flex justify-content-end gap-2"}>
        <Button type={"button"} variant="secondary" className={"px-3 py-1"} onClick={handleCloseModal} ref={btnCancel}>
          {!allOK ? "Cancelar" : "Fechar"}
        </Button>
        {
          !allOK ? (
            <Button type={"submit"} variant="primary" className={`px-3 py-1`} disabled={isLoading}>
              {!codeIsSent ? "Próximo" : "Enviar"}
            </Button>
          ) : ""
        }
      </div>
    </Form>
  )
}

ReportForm.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
}

export default ReportForm;
