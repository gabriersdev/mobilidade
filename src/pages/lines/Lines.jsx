import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import ListLines from "../../components/listLines/ListLines.jsx";
import Line from "../../components/line/Line.jsx";
import Util from "../../assets/util";

import "./lines.css";
import Title from "../../components/title/Title.jsx";

const Lines = () => {

  const { id } = useParams()

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
              <Title>Linhas</Title>
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
