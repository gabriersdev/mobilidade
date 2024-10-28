import React from "react";
import Title from "../../components/title/Title";
import FormSearch from "../../components/formSearch/FormSearch";
import Grid from "../../components/grid/Grid";
import Card from "../../components/card/Card";

const Home = () => {
  return (
    <div>
      <FormSearch formTitle="Para onde vamos?" inputPlaceholder="belo horizonte..." />

      <Title title="Principais Linhas" />
      <Grid>
        <Card title="Linha 400C" subtitle="Santos -> São Paulo">Linha de ônibus de Santos para São Paulo via Avenida Professor Girafales. Partidas de segunda à sexta-feira a partir das 04h05.</Card>
      </Grid>
    </div>
  );
}

export default Home;
