import {useCallback, useEffect, useState} from 'react'
// import Util from "../../assets/Util.jsx";
import Title from "../../components/title/Title.jsx";
import axios from "axios";
import config from "../../config.js";
import Alert from "../../components/alert/Alert.jsx";
import Accordion from "../../components/accordion/Accordion.jsx";
import AccordionItem from "../../components/accordion/AccordionItem.jsx";
import {Link} from "react-router-dom";
import AnimatedComponents from "../../components/animatedComponent/AnimatedComponents.jsx";
import {Button, Card, CardBody, CardHeader, CardTitle, FormControl, InputGroup, ListGroup, ListGroupItem} from "react-bootstrap";

const Guide = () => {
  const [data, setData] = useState({});
  const [originalData, setOriginalData] = useState({});
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState(<></>);
  const [term, setTerm] = useState(null);
  const [message, setMessage] = useState("");
  const [indiceLetters, setIndiceLetters] = useState([]);
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    
    try {
      const response = await axios.get(`${config.host}/api/guide`);
      setData(response.data);
      setOriginalData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [])
  
  useEffect(() => {
    // Altera o título da página
    const psTitle = `Guia do Transporte Público`;
    document.title = `Mobilidade - ${psTitle} de Sabará-MG`;
    // Util.updateActiveLink()
    
    const dataCompanyId = document.querySelector('.breadcrumb-item:nth-child(2)')
    if (dataCompanyId) dataCompanyId.querySelector('a').textContent = `${psTitle}`;
    
    fetchData().then(() => {
    });
  }, [fetchData])
  
  useEffect(() => {
    if (loading) setContent(<>Carregando...</>)
    else if (error) setContent(<Alert variant={"danger"}>{error}</Alert>);
    else if (data) {
      setMessage("");
      const uniqueLetters = Object.keys(data).map(key => key[0]).filter((v, i, self) => self.indexOf(v) === i).toSorted();
      setIndiceLetters(uniqueLetters);
      
      setContent(
        <div className={"d-flex flex-column gap-5"}>
          {
            uniqueLetters.map((letter, i) => {
              return (
                <div key={i} id={`index-letter-${letter}`}>
                  <div className={"d-inline-flex justify-content-between gap-2 flex-wrap"}>
                    <Title type={"h3"} classX={" fs-6 fw-bold"}>{letter}</Title>
                    {uniqueLetters[uniqueLetters.indexOf(letter) + 1] && <Link to={`#index-letter-${uniqueLetters[uniqueLetters.indexOf(letter) + 1]}`} className={"text-decoration-none text-sml text-body-tertiary"}>Ir para a próxima letra do índice</Link>}
                  </div>
                  
                  <Accordion defaultEventKey={["0"]}>
                    {
                      Object.entries(data).filter(([k]) => k[0] === letter).map(([key, value], index) => {
                        return (
                          <AccordionItem title={key.replace("/", " -> ").replaceAll("/", " - ")} key={index} eventKey={index.toString()}>
                            <ul className="ps-3 m-0" style={{lineHeight: 1.75}}>
                              {
                                value.map((line, i) => {
                                  return (
                                    <li key={i}><Link to={`/lines/${line["lineId"]}`}>Linha {line["lineNumber"]} - {line["lineName"].replaceAll("/", " -> ")}</Link></li>
                                  )
                                })
                              }
                            </ul>
                          </AccordionItem>
                        )
                      })
                    }
                  </Accordion>
                </div>
              )
            })
          }
        </div>
      )
    } else setContent(<div>Conteúdo não mapeado</div>)
  }, [loading, error, data]);
  
  useEffect(() => {
    if (term) {
      const sanitizeTerm = term.trim();
      setMessage("");
      
      const results = Object.keys(originalData).filter(key => {
        return (key.toLowerCase().substring(0, sanitizeTerm.length) === sanitizeTerm.toLowerCase()) ||
          (key.toLowerCase().includes(sanitizeTerm.toLowerCase()));
      });
      
      let objResults = {};
      
      for (let result of results) objResults[result] = originalData[result];
      
      if (Object.keys(objResults).length === 0) {
        setMessage("Nenhum endereço ou local encontrado que correspondesse a sua pesquisa.");
        setData(originalData);
      } else setData(objResults);
    } else setData(originalData);
  }, [term, originalData])
  
  return (
    <div>
      <div className={"d-flex flex-column gap-5"}>
        <Title title="Guia do Transporte Público de Sabará-MG" id="topo" classX=" text-body-secondary"/>
        <section>
          <AnimatedComponents>
            <form className="mb-5" onSubmit={(e) => {
              e.preventDefault()
            }}>
              <InputGroup>
                <FormControl type={"text"} as={"input"} placeholder={"Pesquise"} onChange={(e) => setTerm(e.target.value)}/>
                <Button variant="default" className={"border text-body-tertiary px-3"} type="reset" aria-hidden="true"><i className="bi bi-x-lg"></i></Button>
                <Button variant="default" className={"border text-body-tertiary px-3"} type="submit" aria-hidden="true"><i className="bi bi-search"></i></Button>
              </InputGroup>
              {(message) && <span className="text-danger d-block mt-1">{message}</span>}
            </form>
            
            <div className="row">
              <div className="col-lg-8">
                {content}
              </div>
              <div className="col-lg-4">
                <Card className="p-0 position-sticky" style={{top: "6rem"}}>
                  <CardHeader className="bg-body-secondary">
                    <CardTitle className={"fs-6 px-3 py-3 m-0 border-bottom border-secondary-subtle"}>Índice de letras</CardTitle>
                  </CardHeader>
                  <CardBody className={"p-3"}>
                    {
                      loading ? (<>Carregando...</>) : (
                        <ListGroup className={"bg-body"}>
                          {indiceLetters?.map((letter, i) => {
                            return (
                              <ListGroupItem as={"a"} key={i} className={"bg-body text-primary border-secondary-subtle"} href={`#index-letter-${letter}`}>
                                <AnimatedComponents>
                                  <span className={"d-block py-1"}>{letter}</span>
                                </AnimatedComponents>
                              </ListGroupItem>
                            )
                          })}
                        </ListGroup>
                      )
                    }
                  </CardBody>
                </Card>
              </div>
            </div>
          </AnimatedComponents>
        </section>
      </div>
    </div>
  );
}

export default Guide;
