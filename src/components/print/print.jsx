import {useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";

import ToastComponent from "../ui/toast/toast.jsx";
import GenericModal from "../ui/modal/modal.jsx";
import PrintButton from "./PrintButton.jsx";

import {generateHtmlContent} from "./html-generator.js";
import {renderPdf, downloadPdf} from "./pdf-service.js";
import {cssContent} from "./print.css.js";

const Print = ({variant, prevContentTarget}) => {
  const [loading, setLoading] = useState(false);
  const [printableAreaExists, setPrintableAreaExists] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [modalContent, setModalContent] = useState({title: "", body: ""});
  
  useEffect(() => {
    const elementId = variant === "departure-times" ? "departure-times-data" : "departure-points-data";
    const interval = setInterval(() => {
      const element = document.getElementById(elementId);
      setPrintableAreaExists(!!element);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [variant]);
  
  const handlePrintError = (title, message) => {
    setModalContent({title, body: message});
    setShowErrorModal(true);
    setLoading(false);
  };
  
  const handleClick = useCallback(async () => {
    setLoading(true);
    
    const {html, fileTitle, error} = generateHtmlContent(variant, prevContentTarget);
    
    if (error) {
      handlePrintError("Erro na Geração de Conteúdo", error);
      return;
    }
    
    try {
      const pdfData = await renderPdf(html, cssContent);
      downloadPdf(pdfData, fileTitle);
      setShowToast(true);
    } catch (err) {
      const userFriendlyMessage = err.message.toLowerCase().includes("Muitas solicitações".toLowerCase())
        ? `Espere um pouquinho! ${err.message}`
        : "Ocorreu um erro ao gerar o PDF. Por favor, tente novamente mais tarde.";
      handlePrintError("Opa!", userFriendlyMessage);
    } finally {
      setLoading(false);
    }
  }, [variant, prevContentTarget]);
  
  if (!printableAreaExists) {
    return null;
  }
  
  return (
    <div>
      <GenericModal
        show={showErrorModal}
        onHide={() => setShowErrorModal(false)}
        title={modalContent.title}
        body={modalContent.body}
      />
      <ToastComponent
        show={showToast}
        setShow={setShowToast}
        title="Mobilidade"
        time="agora"
        content={<span className="text-success">Arquivo para impressão gerado e baixado com sucesso!</span>}
      />
      <PrintButton loading={loading} onClick={handleClick}/>
    </div>
  );
};

Print.propTypes = {
  variant: PropTypes.string.isRequired,
  prevContentTarget: PropTypes.string,
};

export default Print;
