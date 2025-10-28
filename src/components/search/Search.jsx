import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Grid from "../grid/Grid.jsx";
import Card from "../card/Card.jsx";
import config from "../../config";
import ListLines from "../listLines/ListLines.jsx";
import AnimatedComponents from "../animatedComponent/AnimatedComponents.jsx";
import {Navigate} from "react-router-dom";

const Search = ({value}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  
  const searchSanitized = value.trim().replace(/[^a-zA-Z0-9À-Ú\s]/gi, '');
  
  useEffect(() => {
    if (searchSanitized && searchSanitized.length > 1) document.title = `Mobilidade - Resultados para "${searchSanitized.substring(0, 1).toUpperCase() + searchSanitized.substring(1)}"`;
    
    const searchDatabase = async () => {
      setIsLoaded(true);
      try {
        const response = await axios.post(`${config.host}/api/lines/search/`, {search: searchSanitized});
        // console.log("Response: ", response);
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error);
      } finally {
        setIsLoaded(false);
      }
    }
    
    searchDatabase().then();
  }, [searchSanitized]);
  
  if (isLoaded) {
    return (
      <AnimatedComponents>
        <div style={{marginTop: '1rem'}}>
          <Grid>
            <Card title="Carregando" subtitle="Aguarde...">
              Estamos conectando ao banco de dados. Esse processo geralmente é rápido. Por favor, aguarde alguns instantes.
            </Card>
          </Grid>
        </div>
      </AnimatedComponents>
    )
  } else if (error) {
    console.log(error)
    return (
      <AnimatedComponents>
        <div style={{marginTop: '1rem'}}>
          <Grid>
            <Card title="Erro" subtitle="Não foi possível carregar as linhas">
              Houve um erro ao carregar as linhas. Por favor, tente novamente mais tarde.
            </Card>
          </Grid>
        </div>
      </AnimatedComponents>
    )
  } else if (data.length === 0) {
    return (
      <AnimatedComponents>
        <div style={{marginTop: '1rem'}}>
          <Grid>
            <Card title="Nenhuma ativa linha encontrada" subtitle="Nenhum resultado">
              Não encontramos nenhuma linha ativa que, de alguma forma, corresponda ao termo.
            </Card>
          </Grid>
        </div>
      </AnimatedComponents>
    )
  } else if (data.length === 1) {
    // Apenas 1 resultado foi encontrado. Direciona para a página da linha.
    return <Navigate to={`/lines/${data?.[0]?.line_id}`}/>;
  } else {
    return <ListLines data={data}/>;
  }
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
}

export default Search;
