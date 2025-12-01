import {useEffect, useState} from 'react';
import {Nav as BootstrapNav} from "react-bootstrap";

const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  
  const isInStandaloneMode = () =>
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator?.["standalone"] === true || false;
  
  useEffect(() => {
    if (isInStandaloneMode()) {
      console.log("Já está rodando como PWA!")
      return;
    }
    
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };
    
    window.addEventListener('beforeinstallprompt', handler);
    
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);
  
  const handleInstallClick = () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    deferredPrompt?.["userChoice"].then((choiceResult) => {
      if (choiceResult?.["outcome"] === 'accepted') console.log('PWA instalado com sucesso');
      else {
        console.log('Usuário recusou o PWA');
      }
      setDeferredPrompt(null);
      setShowInstallButton(false);
    });
  };
  
  return (
    showInstallButton && (
      <div>
        <BootstrapNav.Link className={"d-inline-flex text-bg-primary text-white rounded-pill px-3 py-2"} to="./search" onClick={handleInstallClick}>
          <div className={"d-flex flex-wrap gap-1"}>
            <span>Baixe o app</span>
            <i className="bi bi-box-arrow-in-down"></i>
          </div>
        </BootstrapNav.Link>
      </div>
    )
  );
};

export default InstallPWAButton;
