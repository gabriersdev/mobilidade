import {Alert, Button, Form, FormControl, FormGroup, FormLabel as BSFormLabel} from "react-bootstrap";

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

const MonitorForm = ({handleCloseModal}) => {
  const [email, setEmail] = useState("");
  const refMail = useRef(null);
  
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [codeIsSent, setCodeIsSent] = useState(false);
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
  }, [email]);
  
  useEffect(() => {
    if (refMail.current) refMail.current.focus();
  }, [refMail])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) alert("Já estamos processando o envio do formulário. Por favor, aguarde um instante.")
    
    if (codeIsSent) {
      if (!verificationCode.trim()) {
        setError("Preencha o código de verificação.");
        return;
      }
      
      setIsLoading(true);
      
      axios.post(`${config.host}/api/verify-code/`, {
        code: verificationCode
      }).then(res => {
        const ret = res.data
        if (ret.res === 200) {
          const successMess = "Tudo certo! A partir de agora você receberá atualizações e informes desta linha. Obrigado!";
          setFeedback(<Alert className="alert-success mb-0">{successMess}</Alert>);
          
          setVerificationCode("");
          setAllOK(true);
          
          if (btnCancel.current) btnCancel.current.focus();
          [1, 2, 3, 4].map(x => x * 2);
          
          return;
        }
        
        setFeedback(<Alert className="alert-danger mb-0">{ret.message || "Algo não saiu como deveria. Tente novamente."}</Alert>);
      }).catch(e => {
        console.error(e);
        alert("Não foi possível enviar a sua requisição. Tente novamente ou contacte o administrador.");
        setFeedback(<Alert className={"alert-danger mb-0"}>Não foi possível enviar a sua requisição. Tente novamente ou contacte o administrador.</Alert>);
      }).finally(() => setIsLoading(false));
      
      return;
    }
    
    // Validar informações
    if (!email.trim()) {
      setError("Você precisa preencher o e-mail!");
      setCodeIsSent(false);
    } else {
      setIsLoading(true);
      
      // Lógica do envio dos dados
      axios.post(`${config.host}/api/follow/add`, {
        email: email.trim(),
        page: window.location.pathname
      }).then(res => {
        console.log(res);
        setFeedback(<Alert className={"alert-info mb-0"}>Um código foi enviado para o seu e-mail.</Alert>)
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
              <FormLabel props={{htmlFor: "mail"}}>E-mail</FormLabel>
              <FormControl type={"email"} id={"mail"} className={"mb-0"} required={true} value={email} onChange={(e) => setEmail(e.target.value)} {...propsInput} maxLength={100} ref={refMail}/>
            </FormGroup>
          </>
        ) :
          !allOK ? (
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

MonitorForm.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
}

export default MonitorForm;
