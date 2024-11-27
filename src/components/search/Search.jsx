import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Lógica de pesquisa
// Pode pesquisar por um nome de bairro, cidade, linha, estação ou rua
// No BD procurar linhas que possuem parte do nome igual ao valor de search e
// Linhas que possuem pontos de paradas que possuem parte do nome igual ao valor de search
// - O nome de cidade pode retornar as linhas que abrangem a cidade
// Sanitizar o valor de search para evitar SQL Injection

const Search = ({ value }) => {
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
      <div>
        <p>Carregando...</p>
      </div>
    )
  } else if (error) {
    console.log(error)
    return (
      <div>
        <p>Erro ao carregar os dados.</p>
      </div>
    )
  } else if (data.length === 0) {
    return (
      <div>
        <p>Nenhum resultado encontrado.</p>
      </div>
    )
  } else {
    return (
      <div>
        {
          data.map((item, index) => {
            console.log(index, item)
            return (
              <div key={index}>
                <p>ITEM</p>
              </div>
            )
          })
        }
      </div>
    )
  }
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  updatePageData: PropTypes.func.isRequired
}

export default Search;
