import Title from "../title/Title";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { FormGroup, Button } from "react-bootstrap";

let count = 0;

const FormSearch = ({ formTitle, inputPlaceholder }) => {
  useEffect(() => {
    count++;
  }, [])

  return (
    <form>
      <FormGroup>
        <FormGroup.Label htmlFor={`input-search-${count}`}>
          <Title type="h2" title={formTitle} />
        </FormGroup.Label>
        <input type="search" id={`input-search-${count}`} placeholder={inputPlaceholder} className="w-100" />
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
