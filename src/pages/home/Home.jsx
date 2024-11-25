import React, { useEffect } from "react";
import Title from "../../components/title/Title";
import FormSearch from "../../components/formSearch/FormSearch";
import ListLines from "../../components/listLines/ListLines";
import Util from "../../assets/util";

const Home = () => {
  useEffect(() => {
    Util.updateActiveLink()
  }, [])

  return (
    <div>
      <FormSearch formTitle="Para onde vamos?" inputPlaceholder="digite o destino..." />

      <div>
        <Title title="Principais Linhas" color="#212529" />
        <ListLines variant={"main"}/>
      </div>
    </div>
  );
}

export default Home;
