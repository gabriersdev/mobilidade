import React, {useEffect, useState} from "react";
import Title from "../../components/title/Title";
import FormSearch from "../../components/formSearch/FormSearch";
import ListLines from "../../components/listLines/ListLines";
import Util from "../../assets/util";
import Search from "../../components/search/Search.jsx";

const Home = () => {
  const [isValidSearch, setIsValidSearch] = useState(false)
  const [termSearch, setTermSearch] = useState(null)

  useEffect(() => {
    // Atualiza o título do documento
    document.title = 'Mobilidade - Home'
    Util.updateActiveLink()
  }, [])

  return (
    <div>
      <FormSearch formTitle="Para onde vamos?" inputPlaceholder="digite o destino..."
                  fnSetIsValidSearch={setIsValidSearch} fnSetTermSearch={setTermSearch}/>

      <div>

        {
          (isValidSearch && termSearch) ? (
            <>
              <Title title="Resultados" color="#212529"/>
              <Search value={termSearch}/>
            </>
          ) : (
            <>
              <Title title="Principais Linhas" color="#212529"/>
              <ListLines variant="main"/>
            </>
          )
        }
      </div>
    </div>
  );
}

export default Home;
