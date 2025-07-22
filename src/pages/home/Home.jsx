import {useEffect} from "react";
import Title from "../../components/title/Title";
import GetAndListLines from "../../components/getAndListLines/GetAndListLines.jsx";
// import Util from "../../assets/Util.jsx";
import FormValidSearch from "../../components/formValidSearch/FormValidSearch.jsx";
import LatestNews from "../../components/latestNews/LatestNews.jsx";

const Home = () => {
  useEffect(() => {
    // Atualiza o título do documento
    document.title = 'Mobilidade - Home'
    // Util.updateActiveLink()
  }, [])
  
  
  return (
    <div>
      <FormValidSearch formTitle={"Para onde vamos?"} inputPlaceholder={""}/>
      <div>
        <>
          <Title title="Principais Linhas" classX={" text-body-secondary"}/>
          <GetAndListLines variant="main"/>
          <div style={{marginTop: '4rem'}}>
            <Title title="Últimas Notícias" classX={" text-body-secondary"}/>
            <LatestNews/>
          </div>
        </>
      </div>
    </div>
  );
}

export default Home;
