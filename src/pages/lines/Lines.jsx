import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Title from "../../components/title/Title";
import Grid from "../../components/grid/Grid";
import Card from "../../components/card/Card";
import { If, Else } from "../../components/if/If"
import Util from "../../assets/util";

import LineIdentification from "../../components/lineIdentification/LineIdentification";
import Accordion from "../../components/accordion/Accordion"
import AccordionItem from "../../components/accordion/AccordionItem"

const Lines = () => {
  const checkIsValid = (id) => {
    if (!id) return false
    if (id.length) return false
    return id.match(/\d/g)
  }

  const { id } = useParams()

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
            <div className="d-flex flex-column" style={{ gap: '4rem' }}>
              <LineIdentification line={{ number: id, start: 'Santos', finish: 'São Paulo' }} />

              <section>
                <Title type="h3" color="#212529">Horários de partidas</Title>
                <Accordion key={0}>
                  <AccordionItem title="Item 1" key={0}>
                    <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis explicabo, quidem quod et rem modi provident neque culpa expedita veritatis voluptas quo veniam dolorem iste accusantium esse vitae molestias autem!</span>
                  </AccordionItem>
                </Accordion>
              </section>

              <section>
                <Title type="h3" color="#212529">Pontos de paradas</Title>
                <span>...</span>
              </section>

              <section>
                <Title type="h3" color="#212529">Pontos de recarga</Title>
                <span>...</span>
              </section>
            </div>
          </Else>
        </If>
      </div>
    </div>
  );
}

export default Lines;
