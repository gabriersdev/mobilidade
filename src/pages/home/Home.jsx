import React, { useEffect } from "react";
import Title from "../../components/title/Title";
import FormSearch from "../../components/formSearch/FormSearch";
import Grid from "../../components/grid/Grid";
import Card from "../../components/card/Card";
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
        <Grid classes="mt-3">
          <Card title="400C" subtitle="Santos -> São Paulo">Linha de ônibus de Santos para São Paulo via Avenida Professor Girafales. Partidas de segunda à sexta-feira a partir das 04h05.</Card>
        </Grid>
      </div>
    </div>
  );
}

export default Home;
