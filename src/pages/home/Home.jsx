import React, { useEffect, useState } from "react";
import Title from "../../components/title/Title";
import FormSearch from "../../components/formSearch/FormSearch";
import ListLines from "../../components/listLines/ListLines";
import Util from "../../assets/util";
import Search from "../../components/search/Search.jsx";

const Home = () => {
  const [ isValidSearch, setIsValidSearch ] = useState(false)

  useEffect(() => {
    Util.updateActiveLink()
  }, [])

  return (
    <div>
      <FormSearch formTitle="Para onde vamos?" inputPlaceholder="digite o destino..." fnSetIsValidSearch={setIsValidSearch} />

      <div>
        <Title title="Principais Linhas" color="#212529" />

        {
          isValidSearch ? (
            <Search value={isValidSearch}/>
          ) : (
            <ListLines variant="main" />
          )
        }
      </div>
    </div>
  );
}

export default Home;
