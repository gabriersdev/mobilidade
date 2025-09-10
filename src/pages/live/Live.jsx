import {useEffect} from 'react'
import Title from "../../components/title/Title.jsx";
import Util from "../../assets/Util.jsx";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";

const Live = () => {
  useEffect(() => {
    // Altera o título da página
    document.title = "Mobilidade - Ao Vivo";
    Util.updateActiveLink();
  }, [])
  
  return (
    <div>
      <div>
        <Title title="Ao vivo" id="topo" classX=" text-body-secondary"/>
      </div>
      
      <form>
        <FormGroup>
          <FormLabel column={"lg"} className={"fw-normal"}>
            <span>Linha</span>
            <FormControl as={"input"} type={"text"} placeholder={""}/>
            {/* TODO: lista de linhas */}
          </FormLabel>
        </FormGroup>
      </form>
      
      <form>
        <FormGroup className={"disabled pointer-event-none"}>
          <FormLabel column={"lg"} className={"fw-normal"}>
            <span>Ponto de parada</span>
            <FormControl as={"input"} type={"text"} placeholder={""}/>
            {/* TODO: listar os pontos de parada depois que a linha for selecionada */}
          </FormLabel>
        </FormGroup>
      </form>
      
      <div className={"rounded-3 bg-body-secondary p-3"}>
        Local: XXXX <br/>
        00:00:00 XXXX de XXXX de XXXX <br/><br/>
        
        <Button variant={"secondary"} size={"sm"} className={"d-flex align-items-center gap-2 flex-wrap"}>
          <i className="bi bi-fullscreen"></i>
          {/*<i className="bi bi-fullscreen-exit"></i>*/}
          <span className={"d-none d-md-inline-block text-sml"}>Abrir em tela cheia</span>
          {/*<span className={"d-none d-md-inline-block text-sml"}>Sair em tela cheia</span>*/}
        </Button>
      </div>
    </div>
  );
}

export default Live;
