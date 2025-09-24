import {useEffect} from "react";
import Title from "../../components/title/Title.jsx";
import GuideBanner from "../../components/banners/GuideBanner.jsx";
import NewsBanner from "../../components/banners/NewsBanner.jsx";
import GetAndListLines from "../../components/getAndListLines/GetAndListLines.jsx";
import FormValidSearch from "../../components/formValidSearch/FormValidSearch.jsx";
import AnimatedComponents from "../../components/animatedComponent/AnimatedComponents.jsx";
import Weather from "../../components/weather/Weather.jsx";
import LatestNews from "../../components/latestNews/LatestNews.jsx";

export default function SabaraInfo() {
  useEffect(() => {
    // Altera o título da página
    document.title = "Mobilidade - Sabará Minas Gerais - Informações";
    // Util.updateActiveLink()
  }, [])
  
  return (
    <div>
      <AnimatedComponents>
        <hgroup>
          <Title title="Sabará Minas Gerais - Informações" type={"h2"} id="topo" classX=" d-none"/>
          <Title title="Sabará" type={"h2"} id="topo" classX=" fs-2 text m-0 p-0 lh-sm"/>
          <Title title="Cidade do estado de Minas Gerais" type={"h2"} id="topo" classX=" fs-2 text-body-secondary m-0 p-0 lh-sm"/>
        </hgroup>
        
        <div>
          <span className={"d-block"}>XX de XXXX de XXXX HH:MM</span>
          <p className={"mb-0 mt-3"}>Agora em Sabará fazem XXº graus. A umidade relativa do ar é de XX%. São XX e XXXX de XXXX. No horário local (Horário de Brasília) são XX:MM. A cidade possui XX linhas de ônibus catalogadas aqui. Elas são operadas pelas companhias XXXX, XXXX e XXXX.</p>
          <Weather/>
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
