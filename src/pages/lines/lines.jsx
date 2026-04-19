import {useEffect} from "react";
import {Navigate, useParams} from "react-router-dom";

import "./lines.css";
import Line from "../../components/line/line.jsx";
import Title from "../../components/ui/title/title.jsx";
import FormValidSearch from "../../components/form-valid-search/form-valid-search.jsx";
import GetAndListLines from "../../components/get-and-list-lines/get-and-list-lines.jsx";
import AnimatedComponents from "../../components/ui/animated-component/animated-components.jsx";
import LatestNews from "../../components/latest-news/latest-news.jsx";

import bcAll from "../../components/breadcrumb-app/breadcrumb-context.jsx";
import SuggestLabel from "../../components/suggest-label/suggest-label.jsx";

const useBreadcrumb = bcAll.useBreadcrumb;

const Lines = () => {
  const {id} = useParams();
  const {setLabel} = useBreadcrumb();
  
  const checkIsValid = (id) => {
    if (!id) return false
    if (!id.length) return false
    return id.match(/\d/g)
  }
  
  useEffect(() => {
    document.title = `Mobilidade - Linhas de Transporte Público`
    setLabel("lines", "Linhas");
  }, []);
  
  if (id && !checkIsValid(id)) return <Navigate to="/404" replace/>;
  
  return (
    <div>
      <div>
        {
          !checkIsValid(id) ?
            <AnimatedComponents>
              <Title classX={" text-body-secondary d-none"}>Linhas</Title>
              <div className={"mb-lg-5"}>
                <FormValidSearch formTitle={"Procurando uma linha?"} inputPlaceholder={" "}/>
                <SuggestLabel/>
              </div>
              <GetAndListLines/>
            </AnimatedComponents>
            
            :
            
            <AnimatedComponents>
              <Line id={id}/>
            </AnimatedComponents>
        }
        
        <div style={{marginTop: '4rem'}} className={"d-none"}>
          <LatestNews/>
        </div>
      </div>
    </div>
  );
}

export default Lines;
