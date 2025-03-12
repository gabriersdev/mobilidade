import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Grid from "../grid/Grid.jsx";
import Card from "../card/Card.jsx";
import axios from "axios";
import Util from "../../assets/Util.js";
import config from "../../config";
import {Badge} from "react-bootstrap";

// TODO - Verificar necessidade da propriedade content
const ListLines = ({variant, content}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  let apiURL = `${config.host}/api/lines`
  let sortFn = (a, b) => a.line_number - b.line_number

  if (variant === 'main') {
    apiURL = `${config.host}/api/lines/main`
    sortFn = (a, b) => a.line_name - b.line_name
  }

  useEffect(() => {
    // Altera o título da página
    document.title = "Mobilidade - Linhas";

    const searchLines = async () => {

      try {
        const response = await axios.get(apiURL);
        setData(response.data.toSorted(sortFn));
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error);
      } finally {
        setIsLoaded(false);
      }
    };

    if (!content) {
      searchLines()
    } else {
      setData(content)
      setIsLoaded(false)
    }

  }, [apiURL, content]);

  if (isLoaded) {
    return (
      <div style={{marginTop: '1rem'}}>
        <Grid>
          <Card title="Carregando" subtitle="Aguarde...">
            Estamos conectando ao banco de dados. Esse processo geralmente é rápido. Por favor, aguarde alguns
            instantes.
          </Card>
          {Array.from({length: 9}, (_, i) => i).map((_, key) => {
            return (
              <Card key={key} variant={"placeholder"}></Card>
            )
          })}
        </Grid>
      </div>
    )
  } else if (error) {
    console.log(error)
    return (
      <div style={{marginTop: '1rem'}}>
        <Grid>
          <Card title="Erro" subtitle="Não foi possível carregar as linhas">
            Houve um erro ao carregar as linhas. Por favor, tente novamente mais tarde.
          </Card>
        </Grid>
      </div>
    )
  } else if (data.length === 0) {
    return (
      <div style={{marginTop: '1rem'}}>
        <Grid>
          <Card title="Nenhuma linha encontrada" subtitle="Não há linhas cadastradas">
            Não encontramos nenhuma linha cadastrada. Por favor, tente novamente mais tarde.
          </Card>
        </Grid>
      </div>
    )
  } else {
    return (
      <div style={{marginTop: '1rem'}}>
        <Grid>
          {data.map((line) => {
            // console.log(line)
            return (
              <Card key={line.line_id} title={`Linha`}
                    badge={(
                      <Badge variant="primary" className={"rounded-5 fw-light"} style={{letterSpacing: '0.5px'}}>
                        N.º {line.line_number}
                      </Badge>
                    )}
                    c={"TODO - Nome da linha, caso seja diferente da partida e destino"}
                    subtitle={`${line.departure_location} -> ${line.destination_location}`.trim()}
                    link={`/lines/${line.line_id}`}>{Util.resumeInfoLine(line)}
              </Card>
            )
          })}

          {/* TODO - separar em um componente */}
          {variant === "main" ? (<Card title={"Para ver mais linhas"} subtitle={"clique aqui ->"} link={'/lines/'}></Card>) : ""}
        </Grid>
      </div>
    );
  }
}

ListLines.propTypes = {
  variant: PropTypes.string,
  content:
  PropTypes.array
}

export default ListLines;
