import {useCallback, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Link, useLocation} from "react-router-dom";

import axios from "axios";
import moment from "moment";
import config from "../../config";

import Util from "../../assets/Util";
import Title from "../title/Title";
import LineIdentification from "../lineIdentification/LineIdentification";
import ListRechargePoints from "../listRecharchePoints/ListRechargePoints";
import Alert from "../alert/Alert";
import ListLineWarnings from "../listLineWarnings/ListLineWarnings";
import FeedbackError from "../feedbackError/FeedbackError";
import Weather from "../weather/Weather";
import AnimatedComponents from "../animatedComponent/AnimatedComponents";
import Print from "../print/Print";
import GetAndListLines from "../getAndListLines/GetAndListLines";
import GuideBanner from "../banners/GuideBanner";
import NewsBanner from "../banners/NewsBanner";
import {ListDepartureTimes} from "../listDepartureTimes/ListDepartureTimes";
import {ListDeparturePoints} from "../listDeparturePoints/ListDeparturePoints";
import {LineContext} from "./LineContext";
import LiveBanner from "../banners/LiveBanner.jsx";

const Line = ({id}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const defaultImage = "/images/banner.png";
  const params = useLocation();
  const paradasSection = useRef();
  
  const renderText = useCallback((text) => {
    // Usa regex para encontrar todas as barras e as envolve em spans
    return text.split(/(\/)/).map((part, index) => {
      if (part === "/") return <span key={index} style={{fontSize: 'inherit', fontFamily: "'Arial', sans-serif"}}>/</span>; // Adiciona uma key para o React
      return part;
    });
  }, []);
  
  useEffect(() => {
    // Altera o título da página
    document.title = "Mobilidade - Consulta Linha - Transporte Público em Sabará - MG | Horários, Pontos de Paradas e Pontos de Recarga";
    
    const searchLine = async (id) => {
      try {
        const response = await axios.post(`${config.host}/api/lines/`, {id: id}); // URL completa da sua API
        setData(response.data);
        // console.log('Dados carregados com sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error);
      } finally {
        setIsLoaded(false);
      }
    };
    
    searchLine(id).then(() => {
    });
  }, [id]);
  
  useEffect(() => {
    const {hash} = params;
    if (!hash || !hash.startsWith("#")) return;
    
    const hashSanitized = hash.split("?")[0];
    const element =
      hashSanitized !== "#paradas"
        ? document.querySelector(hashSanitized)
        : paradasSection.current;
    
    if (!element) return;
    let observer;
    
    // Função para realizar o scroll
    const scrollToElement = () => {
      const top = element.offsetTop;
      if (top > 0 && element.tagName.toLowerCase() === "section") {
        window.scroll({
          behavior: "smooth",
          top: top - 5 * 16, // 5rem de margem
        });
        if (observer && observer.disconnect) observer.disconnect();
      }
    };
    
    // Caso o elemento já esteja renderizado com altura válida
    if (element.offsetHeight > 0) {
      requestAnimationFrame(scrollToElement);
      return;
    } else {
      // Se não encontrar o elemento com offsetHeight, clica no botão "paradas" para tentar direcionar o usuário até a seção
      const btn = Array.from(document.querySelectorAll("a.text-body-secondary.nav-link")).find(a => a?.textContent?.toLowerCase()?.trim() === "paradas");
      if (btn) btn.click();
    }
    
    // Observa quando o layout for atualizado
    observer = new ResizeObserver(() => {
      if (element.offsetHeight > 0) {
        requestAnimationFrame(scrollToElement);
      }
    });
    
    observer.observe(element);
    
    // Limpeza
    return () => observer.disconnect();
  }, [params, paradasSection]);
  
  if (isLoaded) {
    return (
      <AnimatedComponents>
        <div>Carregando...</div>
      </AnimatedComponents>
    );
  } else if (error) {
    console.log(error);
    return (
      <AnimatedComponents>
        <FeedbackError code={error.response ? error.response.status || 500 : 500} text={error.message} type={'card'}/>
      </AnimatedComponents>
    );
  } else if (data.length === 0) {
    return (
      <AnimatedComponents>
        <Alert variant={'danger'} margin={"mt-0"}>
          <span>Nenhuma linha ativa encontrada.</span>
        </Alert>
      </AnimatedComponents>
    );
  } else {
    // Altera o título da página =
    document.title = `Linha ${data[0].line_number} | ${data[0].departure_location} - ${data[0].destination_location} | Transporte Público em Sabará - MG | Horários, Pontos de Paradas e Pontos de Recarga`;
    const dataLineId = document.querySelectorAll('.breadcrumb-i.data-line-id')
    if (dataLineId) dataLineId.forEach((item) => {
      try {
        item.querySelector('a').textContent = `${data[0].line_number} - ${data[0].departure_location} -> ${data[0].destination_location}`;
      } catch (error) {
        console.log((error ?? "").toString().substring(0, 1) + ". Um erro ocorreu...");
        console.log("Um erro ocorreu...");
      }
    });
    
    return (
      <div className="d-flex flex-column" style={{gap: '3rem'}}>
        <LineContext>
          <AnimatedComponents>
            <section id={"id"}>
              <AnimatedComponents>
                <LineIdentification line={data[0]}/>
                {data[0].observations ? (
                    <Alert variant={'secondary'} margin={"mt-3 mb-0"}>
                      <span>{data[0].observations}</span>
                    </Alert>)
                  : ""
                }
                
                <Weather/>
                <ListLineWarnings line_id={data[0].line_id}/>
              </AnimatedComponents>
            </section>
            
            <section id={"partidas"} className={"pt-3"}>
              <div className={"d-flex flex-wrap justify-content-between align-items-start mb-2"}>
                <Title type="h3" classX={" pb-2 text-body-secondary"}>Horários de partidas</Title>
                <Print variant={"departure-times"} prevContentTarget={"id"}/>
              </div>
              <ListDepartureTimes line_id={data[0].line_id} departure_location={data[0].departure_location} destination_location={data[0].destination_location}/>
              <div className={"mt-4 pt-1"}>
                <LiveBanner/>
              </div>
            </section>
            
            <section id={"paradas"} ref={paradasSection} className={"pt-3"}>
              <div className={"d-flex flex-wrap justify-content-between align-items-start mb-2"}>
                <Title type="h3" classX={" pb-2 text-body-secondary"}>Pontos de paradas</Title>
                <Print variant={"departure-points"} prevContentTarget={"id"}/>
              </div>
              <ListDeparturePoints line_id={data[0].line_id} departure_location={data[0].departure_location} destination_location={data[0].destination_location}/>
            </section>
            
            <section id={"pontos-de-recarga"} className={"pt-3"}>
              <Title type="h3" classX={" pb-2 text-body-secondary"}>Pontos de recarga</Title>
              <ListRechargePoints id_company={data[0].company_id} company_name={data[0].company_name}/>
            </section>
            
            <section id={"linhas-similares"} className={"pt-3"}>
              <Title type="h3" classX={" text-body-secondary"}>Linhas similares</Title>
              <GetAndListLines variant="similar-lines"/>
            </section>
            
            <section id={"resume"} className={"pt-3"}>
              <Title type="h3" classX={" text-body-secondary"}>Sobre esta linha</Title>
              <div className={"mt-3 position-relative"}>
                <img src={defaultImage} alt={`Imagem de veículo da linha ${id}. Banner do Mobilidade.`} width={"100"} height={"500px"} className={"w-100 object-fit-cover rounded-3"}/>
                <div className={"p-3 position-absolute top-0 w-100 h-100 rounded-3"} style={{background: "linear-gradient(to bottom,#00000025 1%, #00000060 75%)", backgroundColor: "#00000015"}}></div>
                <div className={"position-absolute bottom-0 mb-4 ms-4 text-balance"} style={{maxWidth: "calc(100% - 3rem)"}}>
                  <div className={"mb-3"}>
                    <h2 className={"text-white fs-3 fw-bold"}>{data[0].line_number}</h2>
                    <span className={"d-none"}>Linha XXXX | XXXX {"->"} XXXX</span>
                  </div>
                  <p className={"m-0 text-white"}>{Util.resumeInfoLine({})}</p>
                </div>
              </div>
              <div className={"mt-3 d-flex gap-3 flex-wrap"}>
                <Link to={`/history/departure-times/${id}`} className={"text-decoration-none"}>Histórico de horários</Link>
                <span className={"text-body-tertiary fw-light"}>|</span>
                <Link to={`/history/fares/${id}`} className={"text-decoration-none"}>Histórico de tarifas</Link>
                <span className={"text-body-tertiary fw-light"}>|</span>
                <Link to={`/history/departure-points/${id}`} className={"text-decoration-none"}>Histórico de pontos de paradas</Link>
              </div>
              <div className={"mt-5 d-flex flex-column gap-3"}>
                <GuideBanner/>
                <NewsBanner/>
              </div>
              <details className={"mt-5 text-muted d-inline-block mb-0"}>
                <summary>Informações carregadas em {renderText(moment().format("DD/MM/YYYY"))} às {moment().format("HH") + "h" + moment().format("mm") + "m"}.</summary>
                <p className={"mb-0 text-body-tertiary"}>{renderText(moment().format("DD/MM/YYYY HH:mm:ss"))} {"- Horário de Brasília"}</p>
              </details>
            </section>
          </AnimatedComponents>
        </LineContext>
      </div>
    )
  }
}

Line.propTypes = {
  id: PropTypes.string.isRequired
}

export default Line;
