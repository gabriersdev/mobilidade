import {useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

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

const Line = ({id}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const defaultImage = "/images/banner.png";
  const initialImage = id ? `/images/lines/${id}.png` : defaultImage;
  const [img, setImg] = useState(initialImage);
  
  const renderText = useCallback((text) => {
    // Usa regex para encontrar todas as barras e as envolve em spans
    return text.split(/(\/)/).map((part, index) => {
      if (part === "/") return <span key={index} style={{fontSize: 'inherit', fontFamily: "'Arial', sans-serif"}}>/</span>; // Adiciona uma key para o React
      return part;
    });
  }, [])
  
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
  
  async function checkFileExists(url) {
    try {
      const response = await fetch(url, {method: 'HEAD'});
      return response.ok; // Returns true if the status code is 200-299
    } catch (error) {
      console.error('Error while checking file:', error);
      return false;
    }
  }

// Usage in your React component
  useEffect(() => {
    if (!id) {
      setImg(defaultImage);
      return;
    }
    try {
      const formUrl = `/images/lines/${id ?? 0}.png`;
      checkFileExists(formUrl).then(exists => {
        console.log(exists);
        if (exists) setImg(formUrl);
        else setImg(defaultImage);
      });
    } catch (error) {
      console.log(`[ERROR] - ${error}`);
      handleImageError();
    }
  }, [id]);
  
  const handleImageError = () => setImg(defaultImage);
  
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
      item.querySelector('a').textContent = `${data[0].line_number} - ${data[0].departure_location} -> ${data[0].destination_location}`;
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
            </section>
            
            <section id={"paradas"} className={"pt-3"}>
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
              <div className={"mt-3 position-relative border rounded-5"}>
                <img src={img} onError={handleImageError} alt={`Imagem de veículo da linha ${id}. Banner do Mobilidade.`} width={"100"} height={"500px"} className={"w-100 object-fit-cover rounded-5 border"}/>
                <div className={"p-3 position-absolute top-0 rounded w-100 h-100"} style={{background: "linear-gradient(-135deg,#00000010 0%, #00000095 50%)", backdropFilter: "blur(12px)"}}></div>
                <div className={"position-absolute bottom-0 mb-4 ms-4 text-balance"} style={{maxWidth: "calc(100% - 3rem)"}}>
                  <div className={"mb-3"}>
                    <h2 className={"text-white fs-3 fw-bold"}>{data[0].line_number}</h2>
                    <span className={"d-none"}>Linha XXXX | XXXX {"->"} XXXX</span>
                  </div>
                  <p className={"m-0 text-white"}>{Util.resumeInfoLine({})}</p>
                </div>
              </div>
              <div className={"mt-3 d-flex gap-3 flex-wrap"}>
                <Link to={`/history/departure-times/${id}`}>Histórico de horários</Link>
                <div className={"d-none"}>
                  <Link to={`/history/#`}>Histórico de tarifas</Link>
                  <Link to={`/history/#`}>Histórico de pontos de paradas</Link>
                </div>
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
