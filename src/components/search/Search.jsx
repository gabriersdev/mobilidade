import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Grid from "../grid/Grid.jsx";
import Card from "../card/Card.jsx";
import Util from "../../assets/Util.js";
import config from "../../config";

const Search = ({ value }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  const searchSanitized = value.trim().replace(/[^a-zA-Z0-9À-Ú\s]/gi, '');

  useEffect(() => {
    const searchDatabase = async () => {
      try {
        // TODO - Link de pesquisa
        const response = await axios.post(`${config.host}/api/lines/search/`, { search: searchSanitized }); // URL completa da sua API
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error);
      } finally {
        setIsLoaded(false);
      }
    }

    searchDatabase()
  }, [searchSanitized]);

  if (isLoaded) {
    return (
      <div style={{ marginTop: '1rem' }}>
        <Grid>
          <Card title="Carregando" subtitle="Aguarde...">Estamos conectando ao banco de dados. Esse processo geralmente
            é
            rápido. Por favor, aguarde alguns instantes.</Card>
        </Grid>
      </div>
    )
  } else if (error) {
    console.log(error)
    return (
      <div style={{ marginTop: '1rem' }}>
        <Grid>
          <Card title="Erro" subtitle="Não foi possível carregar as linhas">Houve um erro ao carregar as linhas. Por
            favor, tente novamente mais tarde.</Card>
        </Grid>
      </div>
    )
  } else if (data.length === 0) {
    return (
      <div style={{ marginTop: '1rem' }}>
        <Grid>
          <Card title="Nenhuma linha encontrada" subtitle="Nenhum resultado">Não encontramos nenhuma linha que, de alguma forma, corresponda ao termo.</Card>
        </Grid>
      </div>
    )
  } else {
    // console.log(data)
    return (
      <div style={{ marginTop: '1rem' }}>
        <Grid>
          {data.map((line) => (
            <Card key={line.line_id} title={`Linha ${line.line_number}`}
              subtitle={`${line.departure_location} -> ${line.destination_location}`}
              link={`/lines/${line.line_id}`}>{Util.resumeInfoLine(line)}</Card>
          ))}
        </Grid>
      </div>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
}

export default Search;
