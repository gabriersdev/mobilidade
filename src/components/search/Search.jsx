import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Search = ({ value, updatePageData }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);

  const searchSanitized = search.trim().replace(/[^a-zA-Z0-9À-Ú\s]/gi, '');
      searchDatabase(searchSanitized)

  useEffect(() => {
    const searchDatabase = async (text) => {
      try {
        // TODO - Link de pesquisa
        const response = await axios.post('#', {text: text}); // URL completa da sua API
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setError(error);
      } finally {
        setIsLoaded(false);
      }
    }

    searchDatabase(value)
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
            return (
              <div key={index}>
                <p>{item.name}</p>
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
