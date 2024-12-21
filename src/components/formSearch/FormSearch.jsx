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


  }

  const [search, setSearch] = useState('');

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Label htmlFor={`input-search-${count}`} column={0}>
          <Title title={formTitle} classX=" text-body-secondary" />
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
