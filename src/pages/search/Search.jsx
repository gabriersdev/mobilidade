import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Title from "../../components/title/Title";
import FormSearch from "../../components/formSearch/FormSearch";
import Util from "../../assets/Util.js";
import ComponentSearch from "../../components/search/Search.jsx";
import Grid from "../../components/grid/Grid.jsx";
import Card from "../../components/card/Card.jsx";

const Search = () => {
  const [isValidSearch, setIsValidSearch] = useState(false)
  const [termSearch, setTermSearch] = useState(null)
  const location = useLocation()

  useEffect(() => {
    // Atualiza o título do documento
    document.title = 'Mobilidade - Pesquisa'
    Util.updateActiveLink()
  }, [])

  useEffect(() => {
    try {
      let queryParams = null

      if (location.search) queryParams = new URLSearchParams(location.search)

      // Verificar se queryParams não é null, se o parâmetro 'or' existe e se ele contém 'freelancer'
      if (queryParams) {
        if (queryParams.get('term')) {
          setTermSearch(queryParams.get('term'))
          setIsValidSearch(true)
        }
      }

    } catch (error) {
      console.log('Ocorreu um erro ao tentar verificar os parâmetros passados. %s', error);
    }
  }, [location])

  return (
    <div>
      <FormSearch formTitle="Para onde vamos?" inputPlaceholder="digite o destino, nome ou número da linha..."
                  fnSetIsValidSearch={setIsValidSearch} fnSetTermSearch={setTermSearch} focus={true}/>

      <div>
        {
          (isValidSearch && termSearch) ? (
              <>
                <Title title="Resultados" classX={" text-body-secondary"}/>
                <ComponentSearch value={termSearch}/>
              </>
            ) :
            (
              <>
                <Title title="Nada encontrado..." classX={" text-body-secondary mb-3"}/>
                <Grid>
                  <Card title="Os resultados aparecem aqui" subtitle="">
                    Digite um termo para pesquisar. Pode ser o nome de uma rua, de um bairro, de uma linha de ônibus, etc. A pesquisa é feita em tempo real.
                  </Card>
                </Grid>
              </>
            )
        }
      </div>
    </div>
  );
}

export default Search;
