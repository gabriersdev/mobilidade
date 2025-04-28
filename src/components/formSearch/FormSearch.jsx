import {useState} from "react";
import PropTypes from "prop-types";

import {Form, FormGroup, Button, Badge} from "react-bootstrap";
import Title from "../title/Title";
import {Link} from "react-router-dom";
import './formSearch.css';

// TODO - Testar a lógica implementada para atualizar os dados da página
const FormSearch = ({formTitle, inputPlaceholder, fnSetIsValidSearch, fnSetTermSearch, focus, initialValue = ""}) => {
  const [search, setSearch] = useState(initialValue || '');
  const [feedback, setFeedback] = useState('');
  
  const handleSubmit = (e) => {
    fnSetIsValidSearch(false);
    fnSetTermSearch(null);
    
    e.preventDefault();
    
    setTimeout(() => {
      if (search.trim().length === 0) {
        setFeedback('O campo de pesquisa não pode estar vazio.');
        fnSetIsValidSearch(false);
      } else if (search.trim().length < 3) {
        setFeedback('O termo para pesquisa deve conter pelo menos 3 caracteres.');
        fnSetIsValidSearch(false);
      } else {
        setFeedback("");
        fnSetIsValidSearch(true);
        fnSetTermSearch(search);
      }
    }, 0)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Label htmlFor={`input-search`} column={0}>
          <Title title={formTitle} classX=" text-body-secondary"/>
        </Form.Label>
        <Form.Control type="search" id={`input-search`} placeholder={inputPlaceholder} className="w-100 fs-5"
                      value={search} onChange={(e) => setSearch(e.target.value)} autoComplete={"off"} autoFocus={focus || false}/>
        <Button variant="primary" style={{display: 'none'}} type="submit" aria-hidden="true">Pesquisar</Button>
      </FormGroup>
      <div className={"py-3 d-flex align-items-center gap-1 overflow-x-scroll"}>
        {
          [
            ["Municipal", "bg-danger-subtle text-danger-emphasis"],
            ["Metropolitano", "bg-primary-subtle text-primary-emphasis"],
            ["Intermunicipal", "bg-primary-subtle text-primary-emphasis"],
            ["Coletivo", "bg-danger-subtle text-danger-emphasis"],
            ["Executivo", "bg-success-subtle text-success-emphasis"],
          ].toSorted((a, b) =>
            (a[1] ? 1 : 0) - (b[1] ? 1 : 0) || (a[1] ? a[1].localeCompare(b[1]) : a[0].localeCompare(b[0]))
          ).map((item, index) => (
            <Link key={index} to={"/lines/4"} className={"cursor-pointer"}>
              <Badge key={index} className={"rounded-pill fw-normal d-inline-block inter fs-6 " + (item[1] ? item[1] : "bg-secondary-subtle text-secondary-emphasis")}>{item[0]}</Badge>
            </Link>
          ))
        }
        <span className={"text-body-tertiary fw-light"}>|</span>
        {
          [...[4999, 4997, 4993, 4992, 4991, 4988, 4987, 4986].map(i => [i])].map((item, index) => (
            <Link key={index} to={"/lines/4"} className={"cursor-pointer"}>
              <Badge className={"rounded-pill fw-normal d-inline-block inter fs-6 " + (item[1] ? item[1] : "bg-primary-subtle text-primary-emphasis")}>{item[0]}</Badge>
            </Link>
          ))
        }
      </div>
      <span className={"d-block mt-2 text-danger"}>{feedback}</span>
    </form>
  )
}

FormSearch.propTypes = {
  formTitle: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  fnSetIsValidSearch: PropTypes.func.isRequired,
  fnSetTermSearch: PropTypes.func.isRequired,
  focus: PropTypes.bool,
  initialValue: PropTypes.string
}

export default FormSearch;
