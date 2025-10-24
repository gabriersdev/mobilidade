import {useCallback, useEffect, useState} from 'react'
import {Button, FormGroup, FormLabel, Spinner} from "react-bootstrap";
import axios from "axios";

import Title from "../../components/title/Title.jsx";
import Util from "../../assets/Util.jsx";
import Alert from "../../components/alert/Alert.jsx";
import AnimatedComponents from "../../components/animatedComponent/AnimatedComponents.jsx";
import GenericCombobox from "../../components/comboBox/ComboBox.jsx";
import config from "../../config.js";

const Live = () => {
  const [lineSelected, setLineSelected] = useState(null);
  const [departurePointSelected, setDeparturePointSelected] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [lines, setLines] = useState(null);
  const [departurePoints, setDeparturePoints] = useState(null);
  
  const fetchInitialData = useCallback(async () => {
    await axios.get(`${config.host}/api/lines/`).then((c) => {
      setLines(c.data.map(c => {
        return {
          id: c?.["line_id"] ?? -1,
          title: Util.renderText((c?.["line_number"] + " - ") + (c?.["line_name"] ?? "")),
          name: Util.renderText(c?.["departure_location"] + " -> " + c?.["destination_location"])
        }
      }));
    }).catch((error) => {
      setError(error);
    });
    
    await axios.get(`${config.host}/api/phisical-departure-points/`).then((c) => {
      setDeparturePoints(c.data?.[0].map(c => {
        return {
          id: c?.["stop_id"] ?? -1,
          title: (((c?.["stop_name"] ? c?.["stop_name"] + " - " : "") + " " + c?.["address"])?.trim() ?? "").replaceAll("/", " - "),
          name: (c?.["address"]?.trim() ?? "").replaceAll("/", " - "),
        }
      }));
    }).catch((error) => {
      setError(error);
    });
  }, []);
  
  const fetchData = useCallback(async () => {
    if (!departurePointSelected) return false;
    console.log(departurePointSelected, lineSelected);
  }, [lineSelected, departurePointSelected]);
  
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
      
      <div>
        <form onSubmit={async (e) => {
          e.preventDefault();
          await fetchData();
        }}>
          {
            lines ? (
              <AnimatedComponents>
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
              </AnimatedComponents>
            ) : (
              <AnimatedComponents>
                <div className={"d-flex flex-wrap gap-2 align-items-center mt-3"}>
                  <Spinner animation="grow" size={"sm"} variant={"primary"}/>
                  <span>Carregando as linhas...</span>
                </div>
              </AnimatedComponents>
            )
          }
          
          {
            departurePoints ? (
              <AnimatedComponents>
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
              </AnimatedComponents>
            ) : (
              (
                <AnimatedComponents>
                  <div className={"d-flex flex-wrap gap-2 align-items- mt-3"}>
                    <Spinner animation="grow" size={"sm"} variant={"primary"}/>
                    <span>Carregando os pontos de parada...</span>
                  </div>
                </AnimatedComponents>
              )
            )
          }
          
          <Button type={"submit"} variant={"primary"} className={"mt-3" + (!departurePoints ? " disabled cursor-not-allowed" : "")}>Pesquisar</Button>
        </form>
      </div>
      
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
