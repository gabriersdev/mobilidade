import React, { useEffect } from "react";
import Title from "../../components/title/Title";
import Grid from "../../components/grid/Grid";
import Card from "../../components/card/Card";
import Util from "../../assets/util";

const Lines = () => {
  useEffect(() => {
    Util.updateActiveLink()
  }, [])

  return (
    <div>
      <div>
        <Title>Linhas</Title>

        <div style={{ marginTop: '2rem' }}>
          <Grid>
            <Card title="400C" subtitle="Santos -> São Paulo">Linha de ônibus de Santos para São Paulo via Avenida Professor Girafales. Partidas de segunda à sexta-feira a partir das 04h05.</Card>
            <Card title="400C" subtitle="Santos -> São Paulo">Linha de ônibus de Santos para São Paulo via Avenida Professor Girafales. Partidas de segunda à sexta-feira a partir das 04h05.</Card>
            <Card title="400C" subtitle="Santos -> São Paulo">Linha de ônibus de Santos para São Paulo via Avenida Professor Girafales. Partidas de segunda à sexta-feira a partir das 04h05.</Card>
            <Card title="400C" subtitle="Santos -> São Paulo">Linha de ônibus de Santos para São Paulo via Avenida Professor Girafales. Partidas de segunda à sexta-feira a partir das 04h05.</Card>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Lines;
