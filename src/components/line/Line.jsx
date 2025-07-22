import {useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";

import axios from "axios";
import config from "../../config";

import Title from "../title/Title";
import LineIdentification from "../lineIdentification/LineIdentification";
import {ListDepartureTimes} from "../listDepartureTimes/ListDepartureTimes";
import ListRechargePoints from "../listRecharchePoints/ListRechargePoints";
import {ListDeparturePoints} from "../listDeparturePoints/ListDeparturePoints";
import Alert from "../alert/Alert";
import ListLineWarnings from "../listLineWarnings/ListLineWarnings";
import FeedbackError from "../feedbackError/FeedbackError";
import Weather from "../weather/Weather";
import AnimatedComponents from "../animatedComponent/AnimatedComponents.jsx";
import Print from "../print/Print.jsx";
import {LineContext} from "./LineContext.jsx";
import GetAndListLines from "../getAndListLines/GetAndListLines.jsx";
import Util from "../../assets/Util.jsx";
import moment from "moment";

const Line = ({id}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  
  const renderText = useCallback((text) => {
    // Usa regex para encontrar todas as barras e as envolve em spans
    return text.split(/(\/)/).map((part, index) => {
      if (part === "/") {
        return <span key={index} style={{fontSize: 'inherit', fontFamily: "'Arial', sans-serif"}}>/</span>; // Adiciona uma key para o React
      }
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
  
  if (isLoaded) {
    return <div>Carregando...</div>;
  } else if (error) {
    console.log(error)
    return <FeedbackError code={error.response ? error.response.status || 500 : 500} text={error.message} type={'card'}/>;
  } else if (data.length === 0) {
    return (
      <Alert variant={'danger'} margin={"mt-0"}>
        <span>Linha não encontrada.</span>
      </Alert>
    );
  } else {
    // console.log(data);
    
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
                <Print variant={"departure_times"}/>
              </div>
              <ListDepartureTimes line_id={data[0].line_id} departure_location={data[0].departure_location} destination_location={data[0].destination_location}/>
            </section>
            
            <section id={"paradas"} className={"pt-3"}>
              <div className={"d-flex flex-wrap justify-content-between align-items-start mb-2"}>
                <Title type="h3" classX={" pb-2 text-body-secondary"}>Pontos de paradas</Title>
                <Print variant={"departure_points"}/>
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
                <h2 className={"position-absolute bottom-0 mb-3 ms-3 px-3 py-1 bg-warning fw-bolder rounded-pill"}><i className="bi bi-bus-front" style={{fontSize: "inherit"}}></i> {data[0].line_number}</h2>
                <img src={"/images/banner.png"} alt="" width={"100"} height={"500px"} className={"w-100 object-fit-cover rounded border"}/>
              </div>
              <div className={"mt-3"}>
                {Util.resumeInfoLine({})}
              </div>
              <details className={"text-muted d-inline-block mt-3 mb-0 "}>
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
