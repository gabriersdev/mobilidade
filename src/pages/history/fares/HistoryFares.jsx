import {Link, useParams} from "react-router-dom";
import Alert from "../../../components/alert/Alert.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../../config.js";
import FeedbackError from "../../../components/feedbackError/FeedbackError.jsx";
import Title from "../../../components/title/Title.jsx";
import AnimatedComponents from "../../../components/animatedComponent/AnimatedComponents.jsx";
import moment from "moment";
import {ListGroup} from "react-bootstrap";
import Util from "../../../assets/Util.jsx";

moment.locale("pt-BR");

export default function HistoryFares() {
  const {id} = useParams();
  
  const departureTimeDate = id;
  const departureTimeDateIsValid = departureTimeDate.match(/^(\d+)X(\d+)X(\d+)$/) || false;
  
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
      const response = {data: [[1]]};
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
  }, [departureTimeDate, id]);
  
  useEffect(() => {
    document.title = "Mobilidade - Histórico de tarifa";
    const breadcrumbData = document.querySelectorAll('.breadcrumb-item');
    try {
      if (breadcrumbData && breadcrumbData[3]) breadcrumbData[3].querySelector('a').textContent = (`${lineData?.[0]?.["line_number"] || "Linha"} - ` + (lineData?.[0]?.["line_name"] ? lineData?.[0]?.["line_name"] : ""))?.replaceAll("/", " -> ");
      else if (breadcrumbData && (!departureTimeDate || !departureTimeDateIsValid) && breadcrumbData[4]) breadcrumbData[4].querySelector('a').textContent = "Mobilidade";
    } catch (error) {
      console.log(error?.substring(0, 1));
    }
  }, [lineData, departureTimeDate, departureTimeDateIsValid]);
  
  useEffect(() => {
    document.title = "Mobilidade - Histórico de tarifa";
    const breadcrumbData = document.querySelectorAll('.breadcrumb-item');
    if (breadcrumbData && breadcrumbData[1] && breadcrumbData[2]) {
      try {
        breadcrumbData[1].querySelector('a').textContent = `Histórico`;
        breadcrumbData[2].querySelector('a').textContent = `Tarifas`;
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  
  if (!checkIsValid(id)) return <Alert variant={'danger'} margin={"mt-0"}>O id da linha não foi informado.</Alert>
  
  if (loaded) return <>Carregando...</>
  else if (error) {
    console.error(error);
    return <FeedbackError code={error.response ? error.response.status || 500 : 500} text={error.message} type={'card'}/>;
  } else if (data.length === 0) return <Alert variant={'danger'} margin={"mt-0"}>Histórico não localizado.</Alert>;
  
  return (
    <AnimatedComponents>
      <span className={"text-body-secondary"}>Histórico de tarifas</span>
      <Link to={`/lines/${id}`} className={"text-decoration-none"}>
        <Title classX=" fs-3 d-inline mt-1 p-0 d-block mb-0">
          <span className="d-block text-body-emphasis" style={{fontSize: "inherit"}}>Linha {(lineData?.[0]?.["line_number"] + " - " + lineData?.[0]?.["departure_location"] + " -> " + lineData?.[0]?.["destination_location"] || "")?.replaceAll("/", " -> ")}</span>
        </Title>
      </Link>
      
      <section className={"d-flex gap-5 mt-5 flex-column"}>
        <AnimatedComponents>
          <ListGroup>
            <ListGroup.Item>
              <Title classX={" fs-5 m-0 pt-1 pb-0 px-0 fw-bold d-bold text-primary"}>R$ {lineData?.[0]?.["fare"]?.toString()?.replace(".", ",")}</Title>
              <span className={"text-body-tertiary"}>Tarifa atualizada em {Util.renderText(moment(lineData?.[0]?.["datetime_last_modify"]?.replace("Z", "-03:00") ?? "").format("DD/MM/YYYY"))}</span>
            </ListGroup.Item>
          </ListGroup>
        </AnimatedComponents>
      </section>
    </AnimatedComponents>
  );
}
