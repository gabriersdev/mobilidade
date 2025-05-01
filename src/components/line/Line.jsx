import {useEffect, useState} from "react";
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

const Line = ({id}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  
  useEffect(() => {
    // Altera o título da página
    document.title = "Mobilidade - Consulta Linha";
    
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
    document.title = `Linha ${data[0].line_number} | ${data[0].departure_location} - ${data[0].destination_location}`;
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
