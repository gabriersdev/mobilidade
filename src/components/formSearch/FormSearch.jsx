import Title from "../title/Title";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import { Form, FormGroup, Button } from "react-bootstrap";

import './formSearch.css';

// TODO - Testar a lógica implementada para atualizar os dados da página
const FormSearch = ({ formTitle, inputPlaceholder, fnSetIsValidSearch }) => {
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    console.log(fnSetIsValidSearch)
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search.trim().length === 0) {
      setFeedback('O campo de pesquisa não pode estar vazio.');
      fnSetIsValidSearch(false);
      return;
    } else if (search.trim().length < 3) {
      setFeedback('O termo para pesquisa deve conter pelo menos 3 caracteres.');
      fnSetIsValidSearch(false);
      return;
    }

    fnSetIsValidSearch(search);
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Label htmlFor={`input-search`}>
          <Title title={formTitle} color="#212529" />
        </Form.Label>
        <Form.Control type="search" id={`input-search`} placeholder={inputPlaceholder} className="w-100 fs-5" value={search} onChange={(e) => setSearch(e.target.value)} required={false} />
        <Button variant="primary" style={{ display: 'none' }} type="submit" aria-hidden="true">Search</Button>
      </FormGroup>
      <span className={"d-block mt-2 text-danger"}>{feedback}</span>
    </form>
  )
}

FormSearch.propTypes = {
  formTitle: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  fnSetIsValidSearch: PropTypes.func.isRequired
}

export default FormSearch;
