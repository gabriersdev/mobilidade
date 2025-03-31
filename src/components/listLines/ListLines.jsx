import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Grid from "../grid/Grid.jsx";
import Card from "../card/Card.jsx";
import axios from "axios";
import Util from "../../assets/Util.js";
import config from "../../config";
import {Badge, Button} from "react-bootstrap";

// Separar responsabilidade nessa função
const renderListLines = () => {
  return null;
}

// Componente para o botão que chama algo para carregar mais linhas
const getMoreLines = (add = 30) => {
  // countLinesLoaded = 30
  // countLinesLoaded + add
  const existsMoreLines = false;
  return (
    // Lista de linhas
    <Button variant={"dark"} className={"w-100 mt-5 bg-body-tertiary border-secondary-subtle"}
            disabled={!existsMoreLines}>
      {existsMoreLines ? "Carregar +30" : "Todas as linha foram carregadas"}
    </Button>
  )
}

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
      searchLines().then()
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
                      <div className="d-flex flex-wrap gap-1">
                        <Badge
                          className={"bg-primary rounded-5 text-white fw-normal"}
                          style={{letterSpacing: '0.5px'}}>
                          N.º {line.line_number}
                        </Badge>
                        
                        {
                          parseFloat(line.fare) > 0 ? (
                            <Badge
                              className={"bg-primary-subtle rounded-5 text-primary-emphasis fw-normal"}
                              style={{letterSpacing: '0.5px'}}>
                              {Util.formatMoney(line.fare)}
                            </Badge>
                          ) : ""
                        }
                        
                        <Badge
                          className={"bg-secondary-subtle rounded-5 text-secondary-emphasis fw-normal"}
                          style={{letterSpacing: '0.5px'}}>
                          Coletivo
                        </Badge>
                      </div>
                    )}
                    c={"TODO - Nome da linha, caso seja diferente da partida e destino"}
                    subtitle={`${line.departure_location} -> ${line.destination_location}`.trim()}
                    link={`/lines/${line.line_id}`}>{Util.resumeInfoLine(line)}
              </Card>
            )
          })}
          
          {/* TODO - separar em um componente */}
          {variant === "main" ? (
            <Card title={"Para ver mais linhas"} subtitle={"clique aqui ->"} link={'/lines/'}></Card>) : ""}
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
