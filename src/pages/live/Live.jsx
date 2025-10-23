import {useCallback, useEffect, useState} from 'react'
import Title from "../../components/title/Title.jsx";
import Util from "../../assets/Util.jsx";
import {Button, FormGroup, FormLabel} from "react-bootstrap";
import Alert from "../../components/alert/Alert.jsx";
import AnimatedComponents from "../../components/animatedComponent/AnimatedComponents.jsx";
import GenericCombobox from "../../components/comboBox/ComboBox.jsx";
import axios from "axios";

const Live = () => {
  const [lineSelected, setLineSelected] = useState(null);
  const [departurePointSelected, setDeparturePointSelected] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  // const [lines, setLines] = useState([]);
  // const [departurePoints, setDeparturePoints] = useState([]);
  
  const fetchInitialData = useCallback(async () => {
    // ...
    // setLines();
    // setDeparturePoints();
  }, []);
  
  const fetchData = useCallback(async () => {
    if (!departurePointSelected) return false;
    console.log(departurePointSelected, lineSelected);
  }, [lineSelected, departurePointSelected]);
  
  const lines = [
    {
      id: 1,
      title: "1900",
      name: "ABC"
    },
    {
      id: 2,
      title: "1901",
      name: "DEF"
    }
  ]
  
  const departurePoints = [
    {
      id: 1,
      title: "1900",
      name: "ABC"
    },
    {
      id: 2,
      title: "1901",
      name: "DEF"
    }
  ]
  
  useEffect(() => {
    // Altera o título da página
    document.title = "Mobilidade - Ao Vivo";
    Util.updateActiveLink();
    fetchInitialData().then(() => {
    });
  }, [fetchInitialData]);
  
  return (
    <AnimatedComponents>
      <div className={"mb-3"}>
        <Title title="Ao vivo" id="topo" classX=" text-body-secondary"/>
      </div>
      
      {
        lines && departurePoints && (
          <div>
            <form onSubmit={async (e) => {
              e.preventDefault();
              await fetchData();
            }}>
              <FormGroup>
                <FormLabel column={"lg"} className={"fw-normal w-100"}>
                  <GenericCombobox
                    items={lines}
                    itemToString={(item) => (item ? item.name : '')}
                    onSelectedItemChange={setLineSelected}
                    label="Linha"
                    placeholder="Selecione uma linha"
                  />
                </FormLabel>
              </FormGroup>
              
              <FormGroup>
                <FormLabel column={"lg"} className={"fw-normal w-100"}>
                  <GenericCombobox
                    items={departurePoints}
                    itemToString={(item) => (item ? item.name : '')}
                    onSelectedItemChange={setDeparturePointSelected}
                    label="Ponto de parada"
                    placeholder="Selecione uma ponto"
                  />
                </FormLabel>
              </FormGroup>
              
              <Button type={"submit"} variant={"primary"} className={"mt-2"}>Pesquisar</Button>
            </form>
          </div>
        )
      }
      
      <div className={"rounded-3 bg-body-secondary p-3 mt-5"}>
        {
          departurePointSelected && (
            <>Local: {JSON.stringify(departurePointSelected ?? "")} <br/></>
          )
        }
        
        {
          !departurePointSelected && (
            <Alert variant={"warning"}>
              Defina um ponto de parada para acompanhar a aproximação de ônibus.
            </Alert>
          )
        }
        
        {
          !data && (
            <Alert variant={"warning"}>
              Nenhum ônibus por perto...
            </Alert>
          )
        }
        
        {
          error && (
            <Alert variant={"danger"}>
              Algo não saiu como deveria... Tente novamente.
            </Alert>
          )
        }
        
        <div className={"d-none"}>
          <Button variant={"primary"} size={"sm"} className={"d-flex align-items-center gap-2 flex-wrap"}>
            <i className="bi bi-fullscreen-exit"></i>
            <span className={"d-none d-md-inline-block text-sml"}>Sair em tela cheia</span>
          </Button>
          
          <Button variant={"primary"} size={"sm"} className={"d-flex align-items-center gap-2 flex-wrap"}>
            <i className="bi bi-fullscreen"></i>
            <span className={"d-none d-md-inline-block text-sml"}>Abrir em tela cheia</span>
          </Button>
        </div>
      </div>
    </AnimatedComponents>
  );
}

export default Live;
