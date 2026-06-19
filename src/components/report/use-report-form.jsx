import {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import config from '@/assets/config.js';
import {Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export const useReportForm = () => {
  const [email, setEmail] = useState("");
  const [typeError, setTypeError] = useState("");
  const [message, setMessage] = useState("");
  const refTypeError = useRef(null);
  
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [codeIsSent, setCodeIsSent] = useState(false);
  const [messageId, setMessageId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [allOK, setAllOK] = useState(false);
  
  const [token, setToken] = useState("");
  const captchaRef = useRef(null);
  
  const btnCancel = useRef(null);
  const inputVerificationCode = useRef(null);
  
  const propsInput = useRef({
    autoComplete: "off",
  });
  
  useEffect(() => {
    captchaRef?.current?.resetCaptcha();
  }, []);
  
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setError("");
    setFeedback("");
  }, [email, typeError, message]);
  
  useEffect(() => {
    if (refTypeError.current) refTypeError.current.focus();
    if (inputVerificationCode.current) inputVerificationCode.current.focus();
  }, [refTypeError, inputVerificationCode]);
  
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
        setError("O parâmetro não foi definido. Contate o administrador");
        captchaRef.current.resetCaptcha();
        return;
      }
      
      setIsLoading(true);
      
      axios.post(`${config.host}/api/verify-code/`, {
        messageId: messageId,
        code: verificationCode
      }).then(res => {
        const ret = res.data
        
        if (ret?.["res"] === 200) {
          const successMess = "Tudo certo! Seu reporte foi enviado com sucesso e será verificado pela nossa equipe. Obrigado!"
          setFeedback(<Alert className="alert-success mb-0">{successMess}</Alert>)
          
          alert(successMess);
          
          setVerificationCode("");
          setAllOK(true);
          
          if (btnCancel.current) btnCancel.current.focus();
          
          return;
        }
        
        setFeedback(<Alert className="alert-danger mb-0">{ret.message || "Algo não saiu como deveria. Tente novamente."}</Alert>);
        captchaRef.current.resetCaptcha();
      }).catch(e => {
        console.error(e);
        alert("Não foi possível enviar a sua requisição. Tente novamente ou contacte o administrador.");
        captchaRef.current.resetCaptcha();
        setFeedback(<Alert className={"alert-danger mb-0"}>Não foi possível enviar a sua requisição. Tente novamente ou contacte o administrador.</Alert>);
      }).finally(() => setIsLoading(false));
      
      return;
    }
    
    if (!email.trim() || !typeError.trim() || !message.trim()) {
      setError("Você precisa preencher todos os dados.");
      setCodeIsSent(false);
      captchaRef.current.resetCaptcha();
    } else if (!token) {
      setError('Por favor, complete o captcha antes de enviar.');
      return false;
    } else {
      setIsLoading(true);
      
      axios.post(`${config.host}/api/report/`, {
        token: token,
        email: email.trim(),
        typeError: typeError.trim(),
        message: message.trim(),
        page: window.location.pathname
      }).then(res => {
        setFeedback(<Alert className={"alert-info mb-0"}>
          Um código foi enviado para o seu e-mail.{" "}
          {email?.toLowerCase()?.includes("gmail") && <div className={"d-inline-block"}><Link to={"https://mail.google.com/mail/u/0/#inbox"} target={"_blank"} rel={"noreferrer noopener"}>Clique aqui para abrir o Gmail</Link> e obter o código de verificação.</div>}
        </Alert>)
        setMessageId(res.data.insertId)
        setCodeIsSent(true)
      }).catch(e => {
        console.error(e);
        captchaRef.current.resetCaptcha();
        alert("Não foi possível enviar a sua requisição. Tente novamente ou contacte o administrador.");
        setFeedback(<Alert className={"alert-danger mb-0"}>Não foi possível enviar a sua requisição. Tente novamente ou contacte o administrador.</Alert>);
        setCodeIsSent(false);
      }).finally(() => setIsLoading(false));
    }
  }
  
  return {
    email, setEmail,
    typeError, setTypeError,
    message, setMessage,
    refTypeError,
    error, setError,
    feedback, setFeedback,
    verificationCode, setVerificationCode,
    codeIsSent, setCodeIsSent,
    isLoading,
    allOK,
    setToken,
    captchaRef,
    btnCancel,
    inputVerificationCode,
    propsInput,
    handleSubmit
  };
};
