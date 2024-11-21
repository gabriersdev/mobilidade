import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Grid from "../grid/Grid.jsx";
import Card from "../card/Card.jsx";
import axios from "axios";

const ListLines = ({ variant }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  let apiURL = 'http://localhost:3001/api/lines'
  let sortFn = (a, b) => a.line_number - b.line_number

  if (variant === 'main') {
    apiURL = 'http://localhost:3001/api/lines/main'
    sortFn = (a, b) => a.line_name - b.line_name
  }

  useEffect(() => {
    const searchLines = async () => {

      try {
        const response = await axios.get(apiURL); // URL completa da sua API
        setData(response.data.toSorted(sortFn));
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
      <Grid>
        <Card title="Carregando" subtitle="Aguarde...">Estamos conectando ao banco de dados. Esse processo geralmente é rápido. Por favor, aguarde alguns instantes.</Card>
      </Grid>
    )
  } else if (error) {
    console.log(error)
    return (
      <Grid>
        <Card title="Erro" subtitle="Não foi possível carregar as linhas">Houve um erro ao carregar as linhas. Por favor, tente novamente mais tarde.</Card>
      </Grid>
    )
  } else if (data.length === 0) {
    return (
      <Grid>
        <Card title="Nenhuma linha encontrada" subtitle="Não há linhas cadastradas">Não encontramos nenhuma linha cadastrada. Por favor, tente novamente mais tarde.</Card>
      </Grid>
    )
  } else {
    return (
      <div style={{ marginTop: '1rem' }}>
        <Grid>
          {data.map((line) => (
            <Card key={line.line_id} title={`Linha ${line.line_number}`} subtitle={`${line.departure_location} -> ${line.destination_location}`} link={`/mobilidade/lines/${line.line_id}`} >Linha de ônibus de Santos para São Paulo via Avenida Professor Girafales. Partidas de segunda à sexta-feira a partir das 04h05.</Card>
          ))}
        </Grid>
      </div>
    );
  }
}

ListLines.propTypes = {
  variant: PropTypes.string,
}

export default ListLines;
