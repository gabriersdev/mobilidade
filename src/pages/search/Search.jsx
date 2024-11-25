import React, { useEffect } from "react";
import Title from "../../components/title/Title";
import FormSearch from "../../components/formSearch/FormSearch";
import Grid from "../../components/grid/Grid";
import Card from "../../components/card/Card";
import Util from "../../assets/util";

const Search = () => {
  useEffect(() => {
    Util.updateActiveLink()
    window.location.replace("/")
  }, [])

  return (
    <div>
      <FormSearch formTitle="Pesquisa" inputPlaceholder="digite uma linha" />

      <div>
        <Title type="h3" title="1 resultado encontrado" color="#212529" />
        <Grid classes="mt-1">
          <Card title="400C" subtitle="Santos -> São Paulo">Linha de ônibus de Santos para São Paulo via Avenida Professor Girafales. Partidas de segunda à sexta-feira a partir das 04h05.</Card>
          <Card title="Opa!" subtitle="Nenhum resultado encontrado">Tente outro termo e pesquise novamente.</Card>
        </Grid>
      </div>
    </div>
  );
}

export default Search;
