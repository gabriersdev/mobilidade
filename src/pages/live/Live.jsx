import {useCallback, useEffect, useRef, useState} from 'react'
import {Button, FormGroup, FormLabel, Spinner} from "react-bootstrap";
import axios from "axios";
import moment from "moment";

import Title from "../../components/title/Title.jsx";
import Util from "../../assets/Util.jsx";
import Alert from "../../components/alert/Alert.jsx";
import AnimatedComponents from "../../components/animatedComponent/AnimatedComponents.jsx";
import GenericCombobox from "../../components/comboBox/ComboBox.jsx";
import config from "../../config.js";
import {Link} from "react-router-dom";

moment.locale("pt-BR");

const Live = () => {
  const [lineSelected, setLineSelected] = useState(null);
  const [departurePointSelected, setDeparturePointSelected] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [lines, setLines] = useState(null);
  const [departurePoints, setDeparturePoints] = useState(null);
  
  const [isOriginalFetch, setIsOriginalFetch] = useState(false);
  const [datetimeOriginalFetch, setDatetimeOriginalFetch] = useState(null);
  const [now, setNow] = useState(moment());
  
  const defaultAudio = "/audio/general.mp3";
  const [audio, setAudio] = useState(defaultAudio);
  
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
  
  const fetchData = async (departurePointSelected) => {
    // Força a perda de foco de todos os inputs
    document.querySelectorAll("input")?.forEach(i => i.blur());
    if (!departurePointSelected) return;
    const s = await axios.post(`${config.host}/api/predictions/departure-points/`, {
      pointId: departurePointSelected?.["id"] ?? -1
    }).catch((error) => {
      console.log("Error", error);
      setError(error);
      setIsOriginalFetch(false);
      setDatetimeOriginalFetch(null);
      return false;
    });
    console.log(s);
    setIsOriginalFetch(true);
    setDatetimeOriginalFetch(moment());
    
    const axiosData = s?.data[0];
    if (Array.isArray(axiosData)) setData(JSON.parse(JSON.stringify(axiosData)).map((d) => {
      return {
        ...d,
        "departure_time_trip": parseInt(import.meta.env.VITE_MODE, 10) === 0 ? d?.["departure_time_trip"].replace("Z", "-03:00") : d?.["departure_time_trip"],
        "expected_arrival_time": parseInt(import.meta.env.VITE_MODE, 10) === 0 ? d?.["expected_arrival_time"].replace("Z", "-03:00") : d?.["expected_arrival_time"],
      }
    }));
    setError(null);
  };
  
  const resultSection = useRef();
  
  useEffect(() => {
    if (departurePointSelected) {
      fetchData(departurePointSelected).then(() => {
      });
    } else setData(null);
  }, [departurePointSelected]);
  
  useEffect(() => {
    console.log(lineSelected);
    if (!lines && !departurePoints) fetchInitialData().then(() => {
    });
  }, [lines, departurePoints, lineSelected, fetchInitialData]);
  
  useEffect(() => {
    if (data && isOriginalFetch) {
      const original = JSON.parse(JSON.stringify(data));
      setIsOriginalFetch(false);
      setData(original);
    }
  }, [data, isOriginalFetch]);
  
  useEffect(() => {
    let int
    if (departurePointSelected && datetimeOriginalFetch) {
      int = setInterval(() => {
        if (moment().diff(datetimeOriginalFetch, "seconds") % 60) fetchData(departurePointSelected).then(() => {
        });
      }, 1000 * 30);
    }
    
    return () => {
      clearInterval(int);
    }
  }, [departurePointSelected, datetimeOriginalFetch]);
  
  useEffect(() => {
    // Altera o título da página
    document.title = "Mobilidade - Ao Vivo";
    Util.updateActiveLink();
    
    let int;
    
    int = setInterval(() => {
      setNow(moment());
    }, 1000);
    
    return () => {
      clearInterval(int);
    }
  }, []);
  
  const filtered = ((d, i, self) => {
    return i === self.findIndex(other =>
      other.line_number === d.line_number &&
      other.departure_time_trip === d.departure_time_trip
    );
  });
  
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
              <div className={"d-none"}>
                <AnimatedComponents>
                  <FormGroup>
                    <FormLabel column={"lg"} className={"fw-normal w-100"}>
                      <GenericCombobox
                        items={lines}
                        itemToString={(item) => (item ? item.name : '')}
                        onSelectedItemChange={setLineSelected}
                        label="Linha"
                        placeholder="Selecione uma linha"
                        required={false}
                      />
                    </FormLabel>
                  </FormGroup>
                </AnimatedComponents>
              </div>
            ) : (
              <></>
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
                      required={true}
                    />
                  </FormLabel>
                </FormGroup>
              </AnimatedComponents>
            ) : (
              (
                <AnimatedComponents>
                  <div className={"d-flex flex-wrap gap-2 align-items-center mt-3"}>
                    <Spinner animation="grow" size={"sm"} variant={"primary"}/>
                    <span>Carregando os pontos de parada...</span>
                  </div>
                </AnimatedComponents>
              )
            )
          }
        </form>
      </div>
      
      <div className={"rounded-3 bg-body-secondary p-3 mt-5"} ref={resultSection}>
        {
          error && (
            <Alert variant={"danger"}>
              Algo não saiu como deveria... Tente novamente.
            </Alert>
          )
        }
        
        {
          departurePointSelected && (
            <>
              <div className={"d-flex flex-column gap-0 mb-3"}>
                <span className={"text-muted text-sml"}>Local</span>
                <span>{Util.renderText(departurePointSelected?.["title"])}</span>
              </div>
              
              {
                (data && Array.isArray(data) && data.length) ? (
                  <>
                    <div className={"d-flex gap-3 flex-wrap mb-3"}>
                      <div className={"d-flex flex-column gap-0 mb-3"}>
                        <span className={"text-muted text-sml"}>Atualizado</span>
                        <span>{moment.isMoment(datetimeOriginalFetch) ? Util.diffToHuman(datetimeOriginalFetch) : "-"}</span>
                      </div>
                      
                      <div className={"d-flex flex-column gap-0 mb-3"}>
                        <span className={"text-muted text-sml"}>Agora são</span>
                        <span>{Util.renderText(moment.isMoment(now) ? now.format("HH:mm:ss") : "-")}</span>
                      </div>
                    </div>
                    
                    <ul style={{listStyleType: "none"}} className={"m-0 p-0"}>
                      {
                        data.filter(filtered).toSpliced(50).map((d, i) => {
                          return (
                            <li className={""} key={i}>
                              <table className="table table-responsive">
                                <tbody>
                                <tr className={"bg-body-secondary"}>
                                  <td className={"bg-body-secondary"} style={{width: ((3 * 32) + 16) + "px"}}>
                                    <Link to={`/lines/${d?.["line_id"] ?? ""}`} className={"text-decoration-none"}>
                                      <Title type="h3" classX=" fs-1 text-primary fw-bold m-0 p-0 line-clamp-1">
                                        {d?.["line_number"] ?? "Linha"}
                                      </Title>
                                    </Link>
                                  </td>
                                  <td className={"bg-body-secondary"} style={{verticalAlign: "middle"}}>
                                    <Link to={`/lines/${d?.["line_id"] ?? ""}`} className={"text-decoration-none d-flex align-items-center justify-content-start"}>
                                      <Title type={"h3"} classX=" text-primary fs-3 fw-medium inter m-0 p-0 d-flex flex-wrap gap-1 align-items-center">
                                        {
                                          parseInt(d?.["direction"] ?? "-1") === 1 ? (`${Util.renderText(d?.["departure_location"] ?? "")} -> ${Util.renderText(d?.["destination_location"] ?? "")}`) :
                                            parseInt(d?.["direction"] ?? "-1") === 0 ? (`${Util.renderText(d?.["departure_location"] ?? "")} ⇄ ${Util.renderText(d?.["destination_location"] ?? "")}`) :
                                              parseInt(d?.["direction"] ?? "-1") === 2 ? (`${Util.renderText(d?.["destination_location"] ?? "")} -> ${Util.renderText(d?.["departure_location"] ?? "")}`) : ""
                                        }
                                        
                                        <span className={"text-sml fs-initial fw-normal"}>- partida às {moment(d?.["departure_time_trip"]).format("HH:mm")}</span>
                                      </Title>
                                      <span className={"d-none text-sml opacity-50"}>({d?.["departure_time_trip"]}) | ({d?.["expected_arrival_time"]})</span>
                                    </Link>
                                  </td>
                                </tr>
                                <tr>
                                  <td className={"bg-body-secondary"}>
                                    {Util.directionToText(d?.["direction"] ?? -1)}
                                  </td>
                                  <td className={"bg-body-secondary"}>
                                    <div className={"d-flex align-items-center flex-wrap gap-1"}>
                                      {
                                        moment(d?.["expected_arrival_time"]).diff(moment(), "minutes") > 0 ? (
                                          <>{(d?.["order_departure_point"] ?? -1) === 1 ? "Saindo" : "Chegando"} {Util.diffToHuman(moment(d?.["expected_arrival_time"]))}</>
                                        ) : (
                                          <>
                                            <audio src={[4986, 4987, 4988].map(x => x.toString()).includes(d?.["line_number"] ?? -1) ? `/audio/${d?.["line_number"]}.mp3` : audio} onError={() => {
                                              setAudio(defaultAudio)
                                            }} className={"d-none"} autoPlay></audio>
                                            <span>{(d?.["order_departure_point"] ?? -1) === 1 ? "Saindo agora!" : "Aproximando..."}</span>
                                          </>
                                        )
                                      }
                                      <span className={"text-muted text-sml"}>- às {moment(d?.["expected_arrival_time"]).format("HH:mm")}</span>
                                    </div>
                                  </td>
                                </tr>
                                </tbody>
                              </table>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </>
                ) : (
                  <Alert variant={"warning"}>
                    Nenhum ônibus por perto...
                  </Alert>
                )
              }
            </>
          )
        }
        
        {
          !departurePointSelected && (
            <Alert variant={"warning"}>
              Defina um ponto de parada para acompanhar a aproximação de ônibus.
            </Alert>
          )
        }
        
        <div className={"d-flex align-items-center flex-wrap gap-2"}>
          <Button variant={"primary"} size={"sm"} className={"d-flex align-items-center gap-2 flex-wrap"} onClick={() => {
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
          
          <Button variant={"info"} size={"sm"} className={"d-flex align-items-center gap-2 flex-wrap"} onClick={() => {
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
        </div>
      </div>
      
      <div className={"d-flex gap-3 mt-3 flex-column"}>
        <Alert variant={"info"} dismissible={true} margin={"m-0"}>
          Quando o ônibus estiver aproximando ou saindo um aviso sonoro será tocado.
        </Alert>
        
        <Alert variant={"info"} dismissible={true} margin={"m-0"}>
          Após uma pesquisa, a cada 30 segundos os resultados são atualizados.
        </Alert>
      </div>
    </AnimatedComponents>
  );
}

export default Live;
