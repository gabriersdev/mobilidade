import Title from "../title/Title";
import PropTypes from "prop-types";
import { useState } from "react";
import { Form, FormGroup, Button } from "react-bootstrap";

import './formSearch.css';

// TODO - Testar a lógica implementada para atualizar os dados da página
const FormSearch = ({ formTitle, inputPlaceholder, isValidSearch }) => {
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search.trim().length === 0) {
      setFeedback('O campo de pesquisa não pode estar vazio.');
      isValidSearch(false);
      return;
    } else if (search.trim().length < 3) {
      setFeedback('O termo para pesquisa deve conter pelo menos 3 caracteres.');
      isValidSearch(false);
      return;
    }

    isValidSearch(search);
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Label htmlFor={`input-search`}>
          <Title title={formTitle} color="#212529" />
        </Form.Label>
        <Form.Control type="search" id={`input-search`} placeholder={inputPlaceholder} className="w-100 fs-5" value={search} onChange={(e) => setSearch(e.target.value)} required={true} />
        <Button variant="primary" style={{ display: 'none' }} type="submit" aria-hidden="true">Search</Button>
      </FormGroup>
      <span className={"d-block mt-2 text-danger"}>{feedback}</span>
    </form>
  )
}

FormSearch.propTypes = {
  formTitle: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  isValidSearch: PropTypes.func.isRequired
}

export default FormSearch;
