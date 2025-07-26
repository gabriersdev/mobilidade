import {useEffect} from "react";
import {useParams} from "react-router-dom";

import GetAndListLines from "../../components/getAndListLines/GetAndListLines.jsx";
import Line from "../../components/line/Line.jsx";
// import Util from "../../assets/Util.jsx";

import "./lines.css";
import Title from "../../components/title/Title.jsx";
import FormValidSearch from "../../components/formValidSearch/FormValidSearch.jsx";
import AnimatedComponents from "../../components/animatedComponent/AnimatedComponents.jsx";

const Lines = () => {
  const {id} = useParams()

  const checkIsValid = (id) => {
    if (!id) return false
    if (!id.length) return false
    return id.match(/\d/g)
  }

  useEffect(() => {
    document.title = `Mobilidade - Linhas de Transporte Público`
  }, []);

  return (
    <div>
      <div>
        {
          !checkIsValid(id) ?
            <>
              <Title classX={" text-body-secondary d-none"}>Linhas</Title>
              <div className={"mb-lg-5"}><FormValidSearch formTitle={"Procurando uma linha?"} inputPlaceholder={" "}/></div>
              <GetAndListLines/>
            </>

            :
            <AnimatedComponents>
              <Line id={id}/>
            </AnimatedComponents>
        }
      </div>
    </div>
  );
}

export default Lines;
