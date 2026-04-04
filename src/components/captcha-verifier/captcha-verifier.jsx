import React, {useEffect, useRef, useState} from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Config from "@/assets/config.js";
import {useCaptcha} from '@/components/captcha-verifier/use-captcha.js';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

function CaptchaVerifier() {
  const [token, setToken] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState('Complete o desafio para continuar.');
  const {setIsVerified} = useCaptcha();
  const captchaRef = useRef(null);
  
  const onVerify = (token) => {
    setToken(token);
    setVerificationStatus('Verificando...');
  };
  
  const onReset = () => {
    if (captchaRef.current) captchaRef.current.resetCaptcha();
    setToken(null);
    setVerificationStatus('Complete o desafio para continuar.');
    setIsVerified(false);
  }
  
  useEffect(() => {
    if (token) {
      const verifySession = async () => {
        try {
          const response = await fetch(Config.host + '/api/verify-session', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({hcaptchaToken: token}),
            credentials: 'include', // Adicionado para estabelecer a sessão com cookie
          });
          
          const data = await response.json();
          
          if (data.success) {
            setVerificationStatus('Sessão verificada com sucesso!');
            setIsVerified(true);
          } else {
            setVerificationStatus(`Falha na verificação: ${data.message ?? "Erro não mapeado"}. Por favor tente novamente.`);
            setIsVerified(false);
          }
        } catch (error) {
          setVerificationStatus('Erro de comunicação com o servidor. Por favor tente novamente.');
          setIsVerified(false);
        }
      };
      
      verifySession().then();
    }
  }, [token, setIsVerified]);
  
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center'
  };
  
  return (
    <div style={containerStyle}>
      <p>{verificationStatus}</p>
      <div className={"d-flex align-items-center flex-wrap gap-1 justify-content-center flex-column"}>
        <HCaptcha
          ref={captchaRef}
          sitekey={import.meta.env?.["VITE_HC_SITE_KEY"]}
          size="normal"
          onVerify={onVerify}
        />
        <Button variant={"secondary"} className={"px-3"} onClick={onReset}>Resetar</Button>
      </div>
      <span className={"text-sml mx-auto text-balance d-block mt-2 text-body-secondary"} style={{maxWidth: 600}}>
        Ao continuar você concorda com a nossa <Link to={"https://www.hcaptcha.com/privacy?hl=pt-BR"} hrefLang={"pt-BR"} className={"fs-inherit link-info"}>política de privacidade</Link> e os <Link to={"https://www.hcaptcha.com/terms?hl=pt-BR"} hrefLang={"pt-BR"} className={"fs-inherit link-info"}>termos de serviço</Link>. A responsabilidade pelo processamento deste captcha é nossa e do HCaptcha.
      </span>
    </div>
  );
}

export default CaptchaVerifier;
