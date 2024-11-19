import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Title from "../title/Title.jsx";
import Grid from "../grid/Grid.jsx";
import Card from "../card/Card.jsx";
import axios from "axios";

const ListLines = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const searchLines = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/lines'); // URL completa da sua API
          setData(response.data.toSorted((a, b) => a.line_number - b.line_number));
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
          setError(error);
        } finally {
          setIsLoaded(false);
        }
      };

    searchLines()
  }, []);

  if (isLoaded) {
    return (
      <>
        <Title>Linhas</Title>
        <Grid>
          <Card title="Carregando" subtitle="Aguarde...">Estamos conectando ao banco de dados. Esse processo geralmente é rápido. Por favor, aguarde alguns instantes.</Card>
        </Grid>
      </>
    )
  } else if (error) {
    console.log(error)
    return (
      <>
        <Title>Linhas</Title>
        <Grid>
          <Card title="Erro" subtitle="Não foi possível carregar as linhas">Houve um erro ao carregar as linhas. Por favor, tente novamente mais tarde.</Card>
        </Grid>
      </>
    )
  } else if (data.length === 0) {
    return (
      <>
        <Title>Linhas</Title>
        <Grid>
          <Card title="Nenhuma linha encontrada" subtitle="Não há linhas cadastradas">Não encontramos nenhuma linha cadastrada. Por favor, tente novamente mais tarde.</Card>
        </Grid>
      </>
    )
  } else {
    return (
      <>
        <Title>Linhas</Title>

        <div style={{ marginTop: '1rem' }}>
          <Grid>
            {data.map((line) => (
              <Card key={line.line_id} title={`Linha ${line.line_number}`} subtitle={line.line_name} link={`/mobilidade/lines/${line.line_id}`} >Linha de ônibus de Santos para São Paulo via Avenida Professor Girafales. Partidas de segunda à sexta-feira a partir das 04h05.</Card>
            ))}
          </Grid>
        </div>
      </>
    );
  }
}

export default ListLines;
