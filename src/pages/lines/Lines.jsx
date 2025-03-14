import {useEffect} from "react";
import {useParams} from "react-router-dom";

import ListLines from "../../components/listLines/ListLines.jsx";
import Line from "../../components/line/Line.jsx";
import Util from "../../assets/Util.js";

import "./lines.css";
import Title from "../../components/title/Title.jsx";
import FormSearch from "../../components/formSearch/FormSearch.jsx";
import FormValidSearch from "../../components/formValidSearch/FormValidSearch.jsx";

const Lines = () => {
  const {id} = useParams()

  const checkIsValid = (id) => {
    if (!id) return false
    if (!id.length) return false
    return id.match(/\d/g)
  }

  useEffect(() => {
    Util.updateActiveLink()
  }, []);

  return (
    <div>
      <div>
        {
          !checkIsValid(id) ?
            <>
              <Title classX={" text-body-secondary d-none"}>Linhas</Title>
              <div className={"mb-lg-5"}><FormValidSearch formTitle={"Procurando uma linha?"} inputPlaceholder={" "}/></div>
              <ListLines/>
            </>

            :
            <Line id={id}/>
        }
      </div>
    </div>
  );
}

export default Lines;
