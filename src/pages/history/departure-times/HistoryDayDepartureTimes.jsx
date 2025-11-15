import {Link, useLocation, useParams} from "react-router-dom";
import Alert from "../../../components/alert/Alert.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import config from "../../../config.js";
import FeedbackError from "../../../components/feedbackError/FeedbackError.jsx";
import Title from "../../../components/title/Title.jsx";
import AnimatedComponents from "../../../components/animatedComponent/AnimatedComponents.jsx";
import moment from "moment";
import {ListDepartureTimes} from "../../../components/listDepartureTimes/ListDepartureTimes.jsx";
import Util from "../../../assets/Util.jsx";
import {Button} from "react-bootstrap";

moment.locale("pt-BR");

export default function HistoryDayDepartureTimes() {
  const {id} = useParams();
  const {pathname} = useLocation();
  
  const departureTimeDate = id;
  const departureTimeDateIsValid = departureTimeDate.match(/^(\d+)X(\d+)X(\d+)$/) || false;
  
  const departureTimeDateFormatted = departureTimeDate.split("X").toReversed().join(".");
  const departureTimeMomentInstance = moment(`${departureTimeDate.split("X").join("-")}T00:00:00-03:00`);
  
  const lineId = pathname.split("/")[pathname.split("/").length - 2];
  
  const [error, setError] = useState(null);
  const [loaded, setIsLoaded] = useState(true);
  const [data, setData] = useState([]);
  const [lineData, setLineData] = useState([]);
  
  const checkIsValid = (id) => {
    if (!id) return false
    if (!id.length) return false
    return id.match(/\d/g)
  }
  
  const getData = async () => {
    try {
      const response = {data: [[1]]};
      const line = await axios.post(`${config.host}/api/lines/`, {id: lineId});
      
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
    if (checkIsValid(lineId)) getData().then(() => {
    });
  }, [lineId, departureTimeDate]);
  
  useEffect(() => {
    document.title = "Mobilidade - Histórico de horários";
    const breadcrumbData = document.querySelectorAll('.breadcrumb-item');
    try {
      if (breadcrumbData && breadcrumbData[3]) breadcrumbData[3].querySelector('a').textContent = (`${lineData?.[0]?.["line_number"] || "Linha"} - ` + (lineData?.[0]?.["line_name"] ? lineData?.[0]?.["line_name"] : ""))?.replaceAll("/", " -> ");
      if (breadcrumbData && departureTimeDate && departureTimeDateIsValid && breadcrumbData[4]) breadcrumbData[4].querySelector('a').textContent = departureTimeDateFormatted;
      else if (breadcrumbData && (!departureTimeDate || !departureTimeDateIsValid) && breadcrumbData[4]) breadcrumbData[4].querySelector('a').textContent = "Mobilidade";
    } catch (error) {
      console.log((error ?? "").toString().substring(0, 1) + ". Um erro ocorreu...");
      console.log("Um erro ocorreu...");
    }
  }, [lineData, departureTimeDate, departureTimeDateIsValid]);
  
  useEffect(() => {
    document.title = "Mobilidade - Histórico de horários";
    const breadcrumbData = document.querySelectorAll('.breadcrumb-item');
    try {
      if (breadcrumbData && breadcrumbData[1] && breadcrumbData[2]) {
        breadcrumbData[1].querySelector('a').textContent = `Histórico`;
        breadcrumbData[2].querySelector('a').textContent = `Horários de partida`;
      }
    } catch (error) {
      console.log((error ?? "").toString().substring(0, 1) + ". Um erro ocorreu...");
      console.log("Um erro ocorreu...");
    }
  }, []);
  
  if (!lineId || !checkIsValid(lineId)) return <Alert variant={'danger'} margin={"mt-0"}>O id da linha não foi informado.</Alert>
  else if (!checkIsValid(departureTimeDate.replace(/\D/, ""))) return <Alert variant={'danger'} margin={"mt-0"}>A data do histórico não foi informada.</Alert>
  else if (!departureTimeDateIsValid) return <Alert variant={'danger'} margin={"mt-0"}>A data do histórico não é válida.</Alert>
  
  if (loaded) return <>Carregando...</>
  else if (error) {
    console.error(error);
    return <FeedbackError code={error.response ? error.response.status || 500 : 500} text={error.message} type={'card'}/>;
  } else if (data.length === 0) return <Alert variant={'danger'} margin={"mt-0"}>Histórico não localizado.</Alert>;
  //
  else if (departureTimeDateIsValid && departureTimeMomentInstance.isValid()) {
    return (
      <AnimatedComponents>
        <h1 className={"m-0 p-0"}><span className={"text-body-secondary fw-normal"}>Histórico de horários</span></h1>
        <Link to={`/lines/${lineId}`} className={"text-decoration-none"}>
          <Title type={"h2"} classX=" fs-3 d-inline mt-1 p-0 d-block mb-0 fw-normal">
            <span className="d-block text-body-emphasis" style={{fontSize: "inherit"}}>Linha {(lineData?.[0]?.["line_number"] + " - " + lineData?.[0]?.["departure_location"] + " -> " + lineData?.[0]?.["destination_location"] || "")?.replaceAll("/", " -> ")}</span>
          </Title>
        </Link>
        
        <h1 className={"m-0 p-0"}>
          <span className="d-block fw-normal fs-6 text-body-secondary mt-2 mb-3" style={{fontSize: "inherit"}}>Snapshot dos horários de partida em {Util.renderText(departureTimeMomentInstance.format("DD"))} de {Util.translateMonth(departureTimeMomentInstance.format("MMMM")?.toLowerCase())} de {departureTimeMomentInstance.format("YYYY")}</span>
        </h1>
        
        <Alert variant={"warning"}>
          <p className={"m-0"}>Você está vendo horários da linha {lineData?.[0]?.["line_number"] || ""} que <b>foram atualizados em {Util.renderText(departureTimeMomentInstance.format("DD"))} de {Util.translateMonth(departureTimeMomentInstance.format("MMMM")?.toLowerCase())} de {departureTimeMomentInstance.format("YYYY")}.</b> <Link to={`/lines/${lineId}`} className={"text-warning-emphasis"} target={"_blank"}>Clique aqui para visualizar os horários de partidas atuais.</Link></p>
        </Alert>
        
        <section className={"d-flex gap-5 mt-5 flex-column"}>
          {lineData && <ListDepartureTimes line_id={parseInt(lineId)} departure_location={lineData?.[0]?.["departure_location"]} destination_location={lineData?.[0]?.["destination_location"]} variant={{type: "history", departureTimeDate: departureTimeMomentInstance.add(1, "day").format("YYYY-MM-DD")}}/>}
        </section>
        
        <Link to={`/lines/${lineId}`} className={"d-inline-flex mt-3 text-decoration-none"}>
          <Button variant={"primary"}>Veja todas as informações da linha {lineData?.[0]?.["line_number"] ?? ""}</Button>
        </Link>
      </AnimatedComponents>
    );
  }
}
