import {useEffect, useRef, useState} from "react";
import {Button} from "react-bootstrap";
import {Tooltip} from "bootstrap";
import PropTypes from "prop-types"

const LineIdentificationShareButton = ({line}) => {
  const btnShareRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messageTooltip, setMessageTooltip] = useState("");
  const originalMessageTooltip = "Clique para copiar";
  
  useEffect(() => {
    if (btnShareRef.current && showTooltip) {
      btnShareRef.current.title = messageTooltip;
      const tooltip = new Tooltip(btnShareRef.current);
      
      tooltip.show();
      
      const timer = setTimeout(() => {
        tooltip.dispose();
        tooltip.hide();
        btnShareRef.current.title = originalMessageTooltip;
        setShowTooltip(false);
      }, 2000);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showTooltip]);
  
  return (
    <Button
      variant={"info"}
      size={"sm"}
      className={"d-inline-flex gap-1 align-items-center"}
      ref={btnShareRef}
      onClick={async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: document.title || `Linha ${line.line_number} | ${line.line_name}`,
              text: "Confira as informações da linha: horários de partida, pontos de recarga e parada, valor da tarifa, integração, compania entre outros.",
              url: window.location.href
            });
            console.log("Conteúdo compartilhado com sucesso!");
          } catch (error) {
            // if (!error.toString().includes("Share canceled")) alert("Erro ao compartilhar:" + error);
            console.log(error.toString());
          }
        } else {
          const instanceURL = new URL(window.location);
          await navigator.clipboard.writeText(`${instanceURL.origin}${instanceURL.pathname}`);
          
          if (Notification.permission === "granted") {
            setMessageTooltip("Link copiado!")
            setShowTooltip(true);
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
              if (permission === "granted") {
                new Notification("Link copiado!");
              }
            });
          }
        }
      }}
    >
      <span>Compartilhar</span>
      <i className="bi bi-share text-sml"></i>
    </Button>
  );
};

LineIdentificationShareButton.propTypes = {
  line: PropTypes.object
}

export default LineIdentificationShareButton;
