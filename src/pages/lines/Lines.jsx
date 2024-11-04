import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Title from "../../components/title/Title";
import Grid from "../../components/grid/Grid";
import Card from "../../components/card/Card";
import { If, Else } from "../../components/if/If"
import Util from "../../assets/util";

const Lines = () => {
  const checkIsValid = (id) => {
    if (!id) return false
    if (id.length) return false
    return id.match(/\d/g)
  }

  const { id } = useParams()
  console.log(id);

  useEffect(() => {
    Util.updateActiveLink()
  }, [])


  return (
    <div>
      <div>
        <If test={!checkIsValid(id)}>
          <Title>Linhas</Title>

          <div style={{ marginTop: '2rem' }}>
            <Grid>
              <Card title="400C" subtitle="Santos -> São Paulo">Linha de ônibus de Santos para São Paulo via Avenida Professor Girafales. Partidas de segunda à sexta-feira a partir das 04h05.</Card>
              <Card title="400C" subtitle="Santos -> São Paulo">Linha de ônibus de Santos para São Paulo via Avenida Professor Girafales. Partidas de segunda à sexta-feira a partir das 04h05.</Card>
              <Card title="400C" subtitle="Santos -> São Paulo">Linha de ônibus de Santos para São Paulo via Avenida Professor Girafales. Partidas de segunda à sexta-feira a partir das 04h05.</Card>
              <Card title="400C" subtitle="Santos -> São Paulo">Linha de ônibus de Santos para São Paulo via Avenida Professor Girafales. Partidas de segunda à sexta-feira a partir das 04h05.</Card>
            </Grid>
          </div>

          <Else>
            <span>Linha {id}</span>
          </Else>
        </If>
      </div>
    </div>
  );
}

export default Lines;
