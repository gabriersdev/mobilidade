import {useEffect} from 'react'
import Title from "../../components/title/Title.jsx";
import Util from "../../assets/Util.jsx";
import {Button, FormControl, FormGroup, FormLabel, InputGroup} from "react-bootstrap";
import Alert from "../../components/alert/Alert.jsx";
import AnimatedComponents from "../../components/animatedComponent/AnimatedComponents.jsx";

const Live = () => {
  useEffect(() => {
    // Altera o título da página
    document.title = "Mobilidade - Ao Vivo";
    Util.updateActiveLink();
  }, [])
  
  return (
    <AnimatedComponents>
      <div>
        <Title title="Ao vivo" id="topo" classX=" text-body-secondary"/>
      </div>
      
      <div>
        <form>
          <FormGroup>
            <FormLabel column={"lg"} className={"fw-normal w-100"}>
              <span>Linha</span>
              <InputGroup>
                <FormControl as={"input"} type={"text"} placeholder={""}/>
                {/* TODO: lista de linhas */}
                <Button variant="default" className={"border text-body-tertiary px-3"} type="button" aria-hidden="true"><i className="bi bi-x-lg"></i></Button>
              </InputGroup>
            </FormLabel>
          </FormGroup>
          
          <FormGroup className={"disabled pointer-event-none"}>
            <FormLabel column={"lg"} className={"fw-normal w-100"}>
              <span>Ponto de parada</span>
            <InputGroup>
              <FormControl as={"input"} type={"text"} placeholder={""} required/>
              <Button variant="default" className={"border text-body-tertiary px-3"} type="button" aria-hidden="true"><i className="bi bi-x-lg"></i></Button>
              {/* TODO: listar os pontos de parada depois que a linha for selecionada */}
            </InputGroup>
            </FormLabel>
          </FormGroup>
          
          <Button type={"submit"} variant={"primary"} className={"mt-2"}>Pesquisar</Button>
        </form>
      </div>
      
      <div className={"rounded-3 bg-body-secondary p-3 mt-5"}>
        Local: XXXX <br/>
        00:00:00 XXXX de XXXX de XXXX <br/><br/>
        
        <Alert variant={"warning"}>
          Defina um ponto de parada para acompanhar a aproximação de ônibus.
          Nenhum ônibus por perto...
        </Alert>
        
        <Alert variant={"danger"}>
          Algo não saiu como deveria... Tente novamente.
        </Alert>
        
        <Button variant={"primary"} size={"sm"} className={"d-flex align-items-center gap-2 flex-wrap"}>
          <i className="bi bi-fullscreen"></i>
          {/*<i className="bi bi-fullscreen-exit"></i>*/}
          <span className={"d-none d-md-inline-block text-sml"}>Abrir em tela cheia</span>
          {/*<span className={"d-none d-md-inline-block text-sml"}>Sair em tela cheia</span>*/}
        </Button>
      </div>
    </AnimatedComponents>
  );
}

export default Live;
