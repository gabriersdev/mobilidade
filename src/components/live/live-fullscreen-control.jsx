import {Button} from "react-bootstrap";
import PropTypes from "prop-types";

export default function LiveFullscreenControl({resultSection}) {
  return (
    <div className={"d-flex align-items-center flex-wrap gap-2"}>
      {!document.fullscreenElement ? (
        <Button variant={"primary"}
                size={"sm"}
                className={"d-flex align-items-center gap-2 flex-wrap"}
                onClick={() => {
                  if (resultSection.current && resultSection.current.requestFullscreen)
                    resultSection.current.requestFullscreen()
                      .then(() => {
                        console.log("Entrou no modo tela cheia com sucesso!");
                      })
                      .catch((err) => {
                        console.error("Erro ao entrar do modo tela cheia:", err);
                      });
                  else alert("Não é possível entrar no modo tela cheia neste navegador. Tente em outro.");
                }}>
          <i className="bi bi-fullscreen"></i>
          <span className={"d-none d-md-inline-block text-sml"}>Abrir em tela cheia</span>
        </Button>
      ) : (
        <Button variant={"info"}
                size={"sm"}
                className={"d-flex align-items-center gap-2 flex-wrap"}
                onClick={() => {
                  if (resultSection.current && document.fullscreenElement) {
                    document.exitFullscreen()
                      .then(() => {
                        console.log("Saiu do modo tela cheia com sucesso!");
                      })
                      .catch((err) => {
                        console.error("Erro ao sair do modo tela cheia:", err);
                      });
                  }
                }}>
          <i className="bi bi-fullscreen-exit"></i>
          <span className={"d-none d-md-inline-block text-sml"}>Sair da tela cheia</span>
        </Button>
      )}
    </div>
  )
}

LiveFullscreenControl.propTypes = {
  resultSection: PropTypes.object
}
