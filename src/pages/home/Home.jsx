import {useEffect} from "react";
import Title from "../../components/title/Title";
import GetAndListLines from "../../components/getAndListLines/GetAndListLines.jsx";
import FormValidSearch from "../../components/formValidSearch/FormValidSearch.jsx";
import LatestNews from "../../components/latestNews/LatestNews.jsx";
import GuideBanner from "../../components/banners/GuideBanner.jsx";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

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
        <>
          <div className={"d-flex align-items-center gap-2 justify-content-between flex-wrap mt-5"}>
            <Title title="Principais Linhas" classX={" text-body-secondary"}/>
            <Button as={Link} to={"/lines"} variant={"secondary"} size={"sm"}>
              <span className={""}>Ver todas</span>
            </Button>
          </div>
          <GetAndListLines variant="main"/>
          <div style={{marginTop: '4rem'}}>
            <LatestNews/>
          </div>
        </>
      </div>
      <GuideBanner/>
    </div>
  );
}

export default Home;
