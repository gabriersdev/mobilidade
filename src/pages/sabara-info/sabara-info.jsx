import {useEffect, useState} from "react";
import Title from "@/components/ui/title/title.jsx";
import moment from "moment/moment";
import {Link} from "react-router-dom";

import Weather from "@/components/weather/weather.jsx";
import NewsBanner from "@/components/banners/news-banner.jsx";
import GuideBanner from "@/components/banners/guide-banner.jsx";
import LatestNews from "@/components/latest-news/latest-news.jsx";
import FormValidSearch from "@/components/form-valid-search/form-valid-search.jsx";
import GetAndListLines from "@/components/get-and-list-lines/get-and-list-lines.jsx";
import AnimatedComponents from "@/components/ui/animated-component/animated-components.jsx";

import bcAll from "@/components/breadcrumb-app/breadcrumb-context.jsx";
import {dateConfigs} from "@/assets/resources.js";

const useBreadcrumb = bcAll.useBreadcrumb;

moment.locale(dateConfigs.lang);

function translateMonth(month) {
  const months = {
    "january": "janeiro",
    "february": "fevereiro",
    "march": "março",
    "april": "abril",
    "may": "maio",
    "june": "junho",
    "july": "julho",
    "august": "agosto",
    "september": "setembro",
    "october": "outubro",
    "november": "novembro",
    "december": "dezembro"
  };
  
  return months[month.toLowerCase()] || month;
}

export default function SabaraInfo() {
  const {setLabel} = useBreadcrumb();
  
  useEffect(() => {
    // Altera o título da página
    document.title = "Mobilidade - Sabará Minas Gerais - Informações";
    // Util.updateActiveLink()
    setLabel("sabara", "Sabará");
  }, []);
  
  const [sabaraTime, setSabaraTime] = useState(moment());
  
  useEffect(() => {
    const int = setInterval(() => {
      setSabaraTime(moment());
    }, 1000);
    
    return () => {
      clearInterval(int);
    }
  }, []);
  
  return (
    <div>
      <AnimatedComponents>
        <hgroup>
          <Title title="Sabará - cidade do estado de Minas Gerais - Informações" type={"h1"} id="topo" classX=" d-none"/>
          <Title type={"h2"} id="topo" classX=" text m-0 p-0 lh-sm text-primary">
            <span className={"fs-2"} style={{letterSpacing: "-1px"}}>
              Sabará
            </span>
          </Title>
          <Title type={"h2"} id="topo" classX=" text-body-secondary m-0 p-0 lh-sm">
            <span className={"fs-2"} style={{letterSpacing: "-1px"}}>
              Cidade do estado de Minas Gerais
            </span>
          </Title>
        </hgroup>
        
        <div className={"d-flex flex-column gap-3"}>
          <div>
            <Weather variant={"city-info"}/>
            <p className={"mb-0 mt-3 text-balance"}>
              É {sabaraTime.format("DD")} de {translateMonth(sabaraTime.format("MMMM"))} de {sabaraTime.format("YYYY")}.
              No horário local (Horário de Brasília) são {sabaraTime.format("HH[h]mm")}.
              A cidade possui 38 linhas de ônibus ativas e outras 3 linhas suspensas ou desativadas catalogadas aqui.
              Elas são operadas pelas companhias <Link to={"/company/4"} className={"text-primary"}>Transporte Coletivo Metropolitano - MG</Link> e <Link to={"/company/3"} className={"text-primary"}>Vinscol</Link>.
            </p>
          </div>
          <div>
            <Weather/>
          </div>
        </div>
        
        <div>
          <div className={"mb-lg-5"}><FormValidSearch formTitle={"Linhas na cidade"} inputPlaceholder={" "}/></div>
          <GetAndListLines/>
        </div>
        
        <div className={"mt-5"}>
          <LatestNews/>
        </div>
        
        <div className={"mt-5 d-flex flex-column gap-3"}>
          <GuideBanner/>
          <NewsBanner/>
        </div>
      </AnimatedComponents>
    </div>
  );
}
