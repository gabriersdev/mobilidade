import {useEffect} from "react";
import Title from "../../components/ui/title/title.jsx";
import GetAndListLines from "../../components/get-and-list-lines/get-and-list-lines.jsx";
import FormValidSearch from "../../components/form-valid-search/form-valid-search.jsx";
import LatestNews from "../../components/latest-news/latest-news.jsx";
import GuideBanner from "../../components/banners/guide-banner.jsx";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import LiveBanner from "../../components/banners/live-banner.jsx";

const Home = () => {
  useEffect(() => {
    // Atualiza o título do documento
    document.title = 'Mobilidade - Transporte Público em Sabará - MG | Horários, Pontos de Paradas e Pontos de Recarga'
    // Util.updateActiveLink()
  }, [])
  
  return (
    <div>
      <FormValidSearch formTitle={"Para onde vamos?"} inputPlaceholder={""}/>
      <div>
        <div className={"d-flex align-items-center gap-2 justify-content-between flex-wrap"}>
          <Title title="Principais Linhas" classX={" text-body-secondary"}/>
          <Button as={Link} to={"/lines"} variant={"secondary"} size={"sm"}>
            <span className={""}>Ver todas</span>
          </Button>
        </div>
        <GetAndListLines variant="main"/>
        <div style={{marginTop: '4rem'}}>
          <LatestNews/>
        </div>
      </div>
    </div>
  );
}

export default Home;
