import {useEffect} from "react";
import Title from "../../components/title/Title";
import ListLines from "../../components/listLines/ListLines";
import Util from "../../assets/Util.js";
import FormValidSearch from "../../components/formValidSearch/FormValidSearch.jsx";

const Home = () => {


  useEffect(() => {
    // Atualiza o título do documento
    document.title = 'Mobilidade - Home'
    Util.updateActiveLink()
  }, [])


  return (
    <div>
      <FormValidSearch formTitle={"Para onde vamos?"} inputPlaceholder={"digite o destino, nome ou número da linha..."}/>
      <div>
        <>
          <Title title="Principais Linhas" classX={" text-body-secondary"}/>
          <ListLines variant="main"/>
        </>
      </div>
    </div>
  );
}

export default Home;
