import Title from "../title/Title";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Form, FormGroup, Button } from "react-bootstrap";

import './formSearch.css';

const FormSearch = ({ formTitle, inputPlaceholder }) => {
  let count = 0;

  useEffect(() => {
    count++;
  }, [count]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lógica de pesquisa
    // Pode pesquisar por um nome de bairro, cidade, linha, estação ou rua
    // No BD procurar linhas que possuem parte do nome igual ao valor de search e
    // Linhas que possuem pontos de paradas que possuem parte do nome igual ao valor de search
    // - O nome de cidade pode retornar as linhas que abrangem a cidade
    // Sanitizar o valor de search para evitar SQL Injection

    console.log('Form submitted');
    console.log('Search:', search);
  }

  const [search, setSearch] = useState('');

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Label htmlFor={`input-search-${count}`}>
          <Title title={formTitle} color="#212529" />
        </Form.Label>
        <Form.Control type="search" id={`input-search-${count}`} placeholder={inputPlaceholder} className="w-100 fs-5" value={search} onChange={(e) => setSearch(e.target.value)} required={true} />
        <Button variant="primary" style={{ display: 'none' }} type="submit" aria-hidden="true">Search</Button>
      </FormGroup>
    </form>
  )
}

FormSearch.propTypes = {
  formTitle: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired
}

export default FormSearch;
