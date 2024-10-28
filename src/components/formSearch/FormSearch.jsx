import Title from "../title/Title";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Form, FormGroup, Button } from "react-bootstrap";


const FormSearch = ({ formTitle, inputPlaceholder }) => {
  let count = 0;

  useEffect(() => {
    count++;
  }, [count]);

  return (
    <form>
      <FormGroup>
        <Form.Label htmlFor={`input-search-${count}`}>
          <Title title={formTitle} />
        </Form.Label>
        <Form.Control type="search" id={`input-search-${count}`} placeholder={inputPlaceholder} className="w-100" />
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
