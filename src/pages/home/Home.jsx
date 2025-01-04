import React, {useEffect, useState} from "react";
import Title from "../../components/title/Title";
import FormSearch from "../../components/formSearch/FormSearch";
import ListLines from "../../components/listLines/ListLines";
import Util from "../../assets/util";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const [isValidSearch, setIsValidSearch] = useState(false)
  const [termSearch, setTermSearch] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    // Atualiza o título do documento
    document.title = 'Mobilidade - Home'
    Util.updateActiveLink()
  }, [])

  if (isValidSearch && termSearch) {
    navigate(`/search/?term=${termSearch}`)
  }

  return (
    <div>
      <FormSearch formTitle="Para onde vamos?" inputPlaceholder="digite o destino..."
                  fnSetIsValidSearch={setIsValidSearch} fnSetTermSearch={setTermSearch}/>

      <div>
        {
          (isValidSearch && termSearch) ? (
            <></>
          ) : (
            <>
              <Title title="Principais Linhas" classX={" text-body-secondary"}/>
              <ListLines variant="main"/>
            </>
          )
        }
      </div>
    </div>
  );
}

export default Home;
