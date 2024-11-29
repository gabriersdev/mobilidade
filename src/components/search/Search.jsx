import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Grid from "../grid/Grid.jsx";
import Card from "../card/Card.jsx";
import Util from "../../assets/util.js";

// Lógica de pesquisa
// Pode pesquisar por um nome de bairro, cidade, linha, estação ou rua
// No BD procurar linhas que possuem parte do nome igual ao valor de search e
// Linhas que possuem pontos de paradas que possuem parte do nome igual ao valor de search
// - O nome de cidade pode retornar as linhas que abrangem a cidade
// Sanitizar o valor de search para evitar SQL Injection

const Search = ({value}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  const searchSanitized = value.trim().replace(/[^a-zA-Z0-9À-Ú\s]/gi, '');

  useEffect(() => {
    const searchDatabase = async () => {
      try {
        // TODO - Link de pesquisa
        const response = await axios.post('http://localhost:3001/api/lines/search/', {search: searchSanitized}); // URL completa da sua API
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error);
      } finally {
        setIsLoaded(false);
      }
    }

    searchDatabase()
  }, []);

  if (isLoaded) {
    return (
      <Grid>
        <Card title="Carregando" subtitle="Aguarde...">Estamos conectando ao banco de dados. Esse processo geralmente é
          rápido. Por favor, aguarde alguns instantes.</Card>
      </Grid>
    )
  } else if (error) {
    console.log(error)
    return (
      <Grid>
        <Card title="Erro" subtitle="Não foi possível carregar as linhas">Houve um erro ao carregar as linhas. Por
          favor, tente novamente mais tarde.</Card>
      </Grid>
    )
  } else if (data.length === 0) {
    return (
      <Grid>
        <Card title="Nenhuma linha encontrada" subtitle="Não há linhas cadastradas">Não encontramos nenhuma linha
          cadastrada. Por favor, tente novamente mais tarde.</Card>
      </Grid>
    )
  } else {
    console.log(data)
    return (
      <div style={{marginTop: '1rem'}}>
        <Grid>
          {data.map((line) => (
            <Card key={line.line_id} title={`Linha ${line.line_number}`}
                  subtitle={`${line.departure_location} -> ${line.destination_location}`}
                  link={`/mobilidade/lines/${line.line_id}`}>{Util.resumeInfoLine(line)}</Card>
          ))}
        </Grid>
      </div>
    );
  }
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  updatePageData: PropTypes.func.isRequired
}

export default Search;
