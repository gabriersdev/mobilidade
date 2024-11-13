import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Title from "../../components/title/Title";
import Grid from "../../components/grid/Grid";
import Card from "../../components/card/Card";
import Table from "../../components/table/Table";
import Util from "../../assets/util";

import LineIdentification from "../../components/lineIdentification/LineIdentification";
import Accordion from "../../components/accordion/Accordion"
import AccordionItem from "../../components/accordion/AccordionItem"
import Legend from "../../components/legend/Legend"

import "./lines.css";
import { Alert } from "react-bootstrap";

const Lines = () => {
  const checkIsValid = (id) => {
    if (!id) return false
    if (!id.length) return false
    return id.match(/\d/g)
  }

  const { id } = useParams()

  useEffect(() => {
    Util.updateActiveLink()
  }, [])

  return (
    <div>
      <div>
        {
          !checkIsValid(id) ?
            <>
              <Title>Linhas</Title>

              <div style={{ marginTop: '1rem' }}>
                <Grid>
                  <Card title="400C" subtitle="Santos -> São Paulo">Linha de ônibus de Santos para São Paulo via Avenida Professor Girafales. Partidas de segunda à sexta-feira a partir das 04h05.</Card>
                  <Card title="400C" subtitle="Santos -> São Paulo">Linha de ônibus de Santos para São Paulo via Avenida Professor Girafales. Partidas de segunda à sexta-feira a partir das 04h05.</Card>
                  <Card title="400C" subtitle="Santos -> São Paulo">Linha de ônibus de Santos para São Paulo via Avenida Professor Girafales. Partidas de segunda à sexta-feira a partir das 04h05.</Card>
                  <Card title="400C" subtitle="Santos -> São Paulo">Linha de ônibus de Santos para São Paulo via Avenida Professor Girafales. Partidas de segunda à sexta-feira a partir das 04h05.</Card>
                </Grid>
              </div>
            </>

            :

            <div className="d-flex flex-column" style={{ gap: '4rem' }}>
              <LineIdentification line={{ number: id, start: 'Santos', finish: 'São Paulo' }} />

              <section>
                <Title type="h3" color="#212529">Horários de partidas</Title>
                <Accordion defaultEventKey={['0']}>
                  <AccordionItem title="Item 1" eventKey="0">
                    <Table content={{ data: Array.from({ length: 25, }, (_, i) => "00:" + ("00" + i).slice(-2)) }} />

                    <Legend items={[{ abrev: 'SC', label: 'Santa Casa' }, { abrev: 'SP', label: 'São Paulo' }]} />
                  </AccordionItem>
                </Accordion>

                <Alert key={'alert-line-hour-info'} variant={'info'} className="d-flex gap-2 mt-3">
                  <i className="bi bi-exclamation-circle"></i>
                  <span>Não localizamos horários para esta linha.</span>
                </Alert>
              </section>

              <section>
                <Title type="h3" color="#212529">Pontos de paradas</Title>
                <Accordion defaultEventKey={['0']}>
                  <AccordionItem title="Sentido ida (Santos -> São Paulo)" eventKey="0">
                    <ul className="list-line-content">
                      <li>Rua XYC, N. 151 - Hospital São José</li>
                      <li>Rua XYC, N. 151 - Hospital São José</li>
                      <li>Rua XYC, N. 151 - Hospital São José</li>
                    </ul>
                  </AccordionItem>
                  <AccordionItem title="Sentido volta (São Paulo -> Santos)" eventKey="1">
                    <ul className="list-line-content">
                      <li>Rua XYC, N. 151 - Hospital São José</li>
                      <li>Rua XYC, N. 151 - Hospital São José</li>
                      <li>Rua XYC, N. 151 - Hospital São José</li>
                    </ul>
                  </AccordionItem>
                </Accordion>
              </section>

              <section>
                <Title type="h3" color="#212529">Pontos de recarga</Title>
                <Grid>
                  <Card title="Quiosque Centro" subtitle="Avenida dos Andradas, 1000">
                    Horário de funcionamento: seg. à sexta das 09h às 21h. Sábados, domingos e feriados das 09h às 18h.
                  </Card>
                  <Card title="Quiosque Centro" subtitle="Avenida dos Andradas, 1000">
                    Horário de funcionamento: seg. à sexta das 09h às 21h. Sábados, domingos e feriados das 09h às 18h.
                  </Card>
                  <Card title="Quiosque Centro" subtitle="Avenida dos Andradas, 1000">
                    Horário de funcionamento: seg. à sexta das 09h às 21h. Sábados, domingos e feriados das 09h às 18h.
                  </Card>
                </Grid>
              </section>
            </div>
        }
      </div>
    </div>
  );
}

export default Lines;
