import {useEffect} from "react";
import moment from "moment/moment";

import NewsBanner from "@/components/banners/news-banner.jsx";
import GuideBanner from "@/components/banners/guide-banner.jsx";
import LatestNews from "@/components/latest-news/latest-news.jsx";
import FormValidSearch from "@/components/form-valid-search/form-valid-search.jsx";
import GetAndListLines from "@/components/get-and-list-lines/get-and-list-lines.jsx";
import AnimatedComponents from "@/components/ui/animated-component/animated-components.jsx";
import CityInfoHeader from "../../components/city-info-header/city-info-header.jsx";

import bcAll from "@/components/breadcrumb-app/breadcrumb-context.jsx";
import {dateConfigs} from "@/assets/resources.js";

const useBreadcrumb = bcAll.useBreadcrumb;

moment.locale(dateConfigs.lang);

export default function SabaraInfo() {
  const {setLabel} = useBreadcrumb();
  
  useEffect(() => {
    document.title = "Mobilidade - Sabará Minas Gerais - Informações";
    setLabel("sabara", "Sabará");
  }, [setLabel]);
  
  return (
    <div>
      <AnimatedComponents>
        <CityInfoHeader />
        
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
