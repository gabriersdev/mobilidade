import {useEffect, useRef, useState} from "react";
import {Badge} from "react-bootstrap";
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
    <Badge className={"rounded-5 bg-primary-subtle p-0"}>
      <button
        ref={btnShareRef}
        className={"btn pv-05 m-0 border-0 px-2 py-1 d-inline-block text-body text-decoration-none d-flex gap-2 border-0 outline-none"}
        style={{lineHeight: "normal"}}
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
            await navigator.clipboard.writeText(window.location.href);
            
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
        <i className="bi bi-share"></i>
      </button>
    </Badge>
  );
};

LineIdentificationShareButton.propTypes = {
  line: PropTypes.object
}

export default LineIdentificationShareButton;
