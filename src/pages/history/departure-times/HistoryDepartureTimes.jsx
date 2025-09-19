import {Link, useParams} from "react-router-dom";
import Alert from "../../../components/alert/Alert.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../../config.js";
import FeedbackError from "../../../components/feedbackError/FeedbackError.jsx";
import Title from "../../../components/title/Title.jsx";
import AnimatedComponents from "../../../components/animatedComponent/AnimatedComponents.jsx";
import {ListGroup} from "react-bootstrap";
import moment from "moment";
import Util from "../../../assets/Util.jsx";

export default function HistoryDepartureTimes() {
  const {id} = useParams();
  const [error, setError] = useState(null);
  const [loaded, setIsLoaded] = useState(true);
  const [data, setData] = useState([]);
  const [lineData, setLineData] = useState([]);
  
  const checkIsValid = (id) => {
    if (!id) return false
    if (!id.length) return false
    return id.match(/\d/g)
  }
  
  const getData = async (id) => {
    try {
      const response = await axios.get(`${config.host}/api/history/lines/${id || "-1"}`);
      const line = await axios.post(`${config.host}/api/lines/`, {id: id});
      
      setData(response.data?.[0]);
      setLineData(line.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setError(error);
    } finally {
      setIsLoaded(false);
    }
  }
  
  useEffect(() => {
    if (!checkIsValid(id)) return <Alert variant={'danger'} margin={"mt-0"}>O id da linha não foi informado.</Alert>
    getData(id).then(() => {
    });
  }, [id]);
  
  useEffect(() => {
    document.title = "Mobilidade - Histórico de horários";
    const breadcrumbData = document.querySelectorAll('.breadcrumb-item');
    if (breadcrumbData && breadcrumbData[3]) breadcrumbData[3].querySelector('a').textContent = (`${lineData?.[0]?.["line_number"] || "Linha"} - ` + (lineData?.[0]?.["line_name"] ? lineData?.[0]?.["line_name"] : "desconhecida"))?.replaceAll("/", " -> ");
    // if (breadcrumbData && breadcrumbData[1]) breadcrumbData[1].querySelector('a').textContent = 'Histórico';
  }, [lineData])
  
  useEffect(() => {
    document.title = "Mobilidade - Histórico de horários";
    const breadcrumbData = document.querySelectorAll('.breadcrumb-item');
    if (breadcrumbData) {
      breadcrumbData[1].querySelector('a').textContent = `Histórico`;
      breadcrumbData[2].querySelector('a').textContent = `Horários de partida`;
    }
  }, []);
  
  if (loaded) {
    return <>Carregando...</>
  } else if (error) {
    console.error(error);
    return <FeedbackError code={error.response ? error.response.status || 500 : 500} text={error.message} type={'card'}/>;
  } else if (data.length === 0) {
    return <Alert variant={'danger'} margin={"mt-0"}>Esta linha não tem histórico de horários.</Alert>;
  } else {
    
    return (
      <AnimatedComponents>
        <span className={"text-body-secondary"}>Histórico de horários</span>
        <Title classX=" fs-3 d-inline text-body-emphasis mt-1 p-0 d-block">
          <span className="" style={{fontSize: "inherit"}}>
            Linha {(lineData?.[0]?.["line_number"] + " - " + lineData?.[0]?.["departure_location"] + " -> " + lineData?.[0]?.["destination_location"] || "")?.replaceAll("/", " -> ")}
          </span>
        </Title>
        
        <section className={"d-flex gap-5 mt-5 flex-column"}>
          <AnimatedComponents>
            <ListGroup>
              {
                data && data.map((item, index) => (
                  <ListGroup.Item as={Link} to={`/history/departure-times/${id || 0}/${Util.renderText(moment(item?.["update_date"] ? `${item?.["update_date"].replace('Z', '-03:00')}` : moment.utc()).format("YYYY[X]MM[X]DD"))}`} key={index}>
                    <span className={"d-block"}>{Util.renderText(moment(item?.["update_date"] ? `${item?.["update_date"].replace('Z', '-03:00')}` : moment.utc()).format("DD/MM/YYYY"))}</span>
                    <span className={"text-body-tertiary"}>{item?.["count_departure_times"]} horários atualizados</span>
                  </ListGroup.Item>
                ))
              }
            </ListGroup>
          </AnimatedComponents>
        </section>
      </AnimatedComponents>
    );
  }
}
