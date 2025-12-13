import axios from "axios";
import moment from "moment";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Button, ListGroup} from "react-bootstrap";

import config from "../../../assets/config.js";
import Util from "../../../assets/Util.jsx";
import Alert from "../../../components/ui/alert/alert.jsx";
import Title from "../../../components/ui/title/title.jsx";
import FeedbackError from "../../../components/ui/feedbackError/feedback-error.jsx";
import AnimatedComponents from "../../../components/ui/animated-component/animated-components.jsx";
import PaginationWithItems from "../../../components/pagination-with-items/pagination-with-items.jsx";

moment.locale("pt-BR");

export default function HistoryDepartureTimes() {
  const {id} = useParams();
  const [error, setError] = useState(null);
  const [loaded, setIsLoaded] = useState(true);
  const [data, setData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [dataAll, setDataAll] = useState([]);
  
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
    try {
      if (breadcrumbData && breadcrumbData[3]) breadcrumbData[3].querySelector('a').textContent = (`${lineData?.[0]?.["line_number"] || "Linha"} - ` + (lineData?.[0]?.["line_name"] ? lineData?.[0]?.["line_name"] : ""))?.replaceAll("/", " ⇄ ");
      if (breadcrumbData && breadcrumbData[1]) breadcrumbData[1].querySelector('a').textContent = 'Histórico';
    } catch (error) {
      console.log((error ?? "").toString().substring(0, 1) + ". Um erro ocorreu...");
      console.log("Um erro ocorreu...");
    }
  }, [lineData]);
  
  useEffect(() => {
    document.title = "Mobilidade - Histórico de horários";
    const breadcrumbData = document.querySelectorAll('.breadcrumb-item');
    try {
      if (breadcrumbData) {
        breadcrumbData[1].querySelector('a').textContent = `Histórico`;
        breadcrumbData[2].querySelector('a').textContent = `Horários de partida`;
      }
    } catch (error) {
      console.log((error ?? "").toString().substring(0, 1) + ". Um erro ocorreu...");
      console.log("Um erro ocorreu...");
    }
  }, []);
  
  useEffect(() => {
    if (data && Array.isArray(data) && data.length) {
      setDataAll(
        data.map((item, index) => (
          <ListGroup.Item as={Link} className={index !== 0 && (index % 10) !== 0 ? "border-top-0" : "border-top"} to={`/history/departure-times/${id || 0}/${Util.renderText(moment(item?.["update_date"] ? `${item?.["update_date"]}` : moment.utc()).add(config.host.startsWith("http://localhost") ? 0 : -3, "h").format("YYYY[X]MM[X]DD"))}`} key={index}>
            <Title type={"h3"} classX={" fs-6 m-0 pt-1 pb-0 px-0 fw-bold d-bold text-primary"}>{Util.renderText(Util.diffToHuman(moment(item?.["update_date"] ? `${item?.["update_date"]}` : moment.utc()).add(config.host.startsWith("http://localhost") ? 0 : -3, "h")))}</Title>
            <span className={"text-body-tertiary"}>{item?.["count_departure_times"]} horários atualizados</span>
          </ListGroup.Item>
        ))
      )
    }
  }, [data]);
  
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
        <h1 className={"m-0 p-0"}><span className={"text-body-secondary fw-normal"}>Histórico de horários</span></h1>
        <Link to={`/lines/${id}`} className={"text-decoration-none"}>
          <Title type={"h2"} classX=" fs-3 d-inline text-body-emphasis fw-normal mt-1 p-0 d-block">
            <span className="" style={{fontSize: "inherit"}}>
              Linha {(lineData?.[0]?.["line_number"] + " - " + lineData?.[0]?.["departure_location"] + " ⇄ " + lineData?.[0]?.["destination_location"] || "")?.replaceAll("/", " ⇄ ")}
            </span>
          </Title>
        </Link>
        
        <section className={"d-flex gap-5 mt-5 flex-column"}>
          <AnimatedComponents>
            <ListGroup>
              {
                Array.isArray(dataAll) && dataAll.length && (
                  <PaginationWithItems items={dataAll} itemsPerPage={10}/>
                )
              }
            </ListGroup>
          </AnimatedComponents>
        </section>
        
        <Link to={`/lines/${id}`} className={"d-inline-flex mt-3 text-decoration-none"}>
          <Button variant={"primary"}>Veja todas as informações da linha {lineData?.[0]?.["line_number"] ?? ""}</Button>
        </Link>
      </AnimatedComponents>
    );
  }
}
