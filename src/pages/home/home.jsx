import {useEffect} from "react";
import {Link} from "react-router-dom";
import {Button, CardTitle, Placeholder} from "react-bootstrap";

import Title from "../../components/ui/title/title.jsx";
import LatestNews from "../../components/latest-news/latest-news.jsx";
import SuggestLabel from "../../components/suggest-label/suggest-label.jsx";
import FormValidSearch from "../../components/form-valid-search/form-valid-search.jsx";
import GetAndListLines from "../../components/get-and-list-lines/get-and-list-lines.jsx";
import AnimatedComponents from "../../components/ui/animated-component/animated-components.jsx";

const Home = () => {
  useEffect(() => {
    document.title = 'Mobilidade - Transporte Público em Sabará - MG | Horários, Pontos de Paradas e Pontos de Recarga'
  }, []);
  
  return (
    <div>
      <div className={"d-flex flex-column gap-1"}>
        <FormValidSearch formTitle={"Para onde vamos?"} inputPlaceholder={""}/>
        <AnimatedComponents>
          <div className={"d-none"}>
            <Placeholder as={CardTitle} animation="glow">
              <Placeholder xs={"10"} className={"rounded w-100 py-3"}/>
            </Placeholder>
          </div>
        </AnimatedComponents>
        <SuggestLabel/>
      </div>
      
      <div>
        <div className={"d-flex align-items-center gap-2 justify-content-between flex-wrap"}>
          <Title type="h3" classX={" text-body-secondary"}>
            <span className={"fs-3 fw-semibold"} style={{fontFamily: "inherit"}}>Principais Linhas</span>
          </Title>
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
