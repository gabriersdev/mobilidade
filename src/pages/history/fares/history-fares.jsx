import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import moment from "moment";
import {Button} from "react-bootstrap";

import Alert from "@/components/ui/alert/alert.jsx";
import FeedbackError from "@/components/ui/feedback-error/feedback-error.jsx";
import AnimatedComponents from "@/components/ui/animated-component/animated-components.jsx";
import FareHistoryHeader from "@/components/fare-history/fare-history-header.jsx";
import FareHistoryDetails from "@/components/fare-history/fare-history-details.jsx";
import {useFareHistory} from "@/components/fare-history/use-fare-history.js";

import bcAll from "@/components/breadcrumb-app/breadcrumb-context.jsx";
import {dateConfigs} from "@/assets/resources.js";

const useBreadcrumb = bcAll.useBreadcrumb;

moment.locale(dateConfigs.lang);

export default function HistoryFares() {
  const {id} = useParams();
  const {data, lineData, error, loading, isValidId} = useFareHistory(id);
  const {setLabel} = useBreadcrumb();
  
  useEffect(() => {
    document.title = "Mobilidade - Histórico de tarifa";
    setLabel("history", "Histórico");
    setLabel("fares", "Tarifas");
    
    if (lineData?.[0]) {
      const lineLabel = `${lineData[0]["line_number"] || "Linha"} - ${lineData[0]["line_name"] || ""}`.replaceAll("/", " ⇄ ");
      setLabel(id, lineLabel);
    }
  }, [lineData, id, setLabel]);
  
  if (!isValidId(id)) {
    return <Alert variant={'danger'} margin={"mt-0"}>O id da linha não foi informado.</Alert>;
  }
  
  if (loading) {
    return <>Carregando...</>;
  }
  
  if (error) {
    return <FeedbackError code={error.response?.status || 500} text={error.message} type={'card'}/>;
  }
  
  if (data.length === 0) {
    return <Alert variant={'danger'} margin={"mt-0"}>Histórico não localizado.</Alert>;
  }
  
  const line = lineData?.[0] || {};
  
  return (
    <AnimatedComponents>
      <FareHistoryHeader
        lineId={id}
        lineNumber={line.line_number}
        departureLocation={line.departure_location}
        destinationLocation={line.destination_location}
      />
      
      <section className={"d-flex flex-column gap-4 gap-sm-5 align-items-start mt-5"}>
        <AnimatedComponents>
          <FareHistoryDetails fare={line.fare} lastModified={line.datetime_last_modify}/>
        </AnimatedComponents>
      </section>
      
      <Link to={`/lines/${id}`} className={"d-inline-flex mt-3 text-decoration-none"}>
        <Button variant={"primary"}>Veja todas as informações da linha {line.line_number ?? ""}</Button>
      </Link>
    </AnimatedComponents>
  );
}
