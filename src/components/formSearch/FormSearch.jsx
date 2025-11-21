import {useState} from "react";
import PropTypes from "prop-types";

import {Form, FormGroup, Button, Image} from "react-bootstrap";
import Title from "../title/Title";
import './formSearch.css';
import SearchLinks from "../search/SearchLinks.jsx";
import {Link} from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

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
        <hgroup className={"d-flex align-items-center justify-content-between flex-wrap flex-column flex-md-row mb-3"}>
          <Form.Label htmlFor={`input-search`} column={0}>
            <Title title={formTitle} classX=" text-body-secondary m-0 p-0"/>
          </Form.Label>
          <div className={"d-flex align-items-center flex-wrap gap-1 justify-content-center"}>
            {
              [
                ["Vinscol", "/company/3", "vinscol.svg"],
                ["Transporte Coletivo Metropolitano - MG", "/company/4", "der-mg.png"],
              ].map((company, index) => (
                <OverlayTrigger key={index} overlay={<Tooltip><p className={"m-0 p-0 line-clamp-2"}>Veja as linhas ativas da companhia {company[0]}</p></Tooltip>}>
                  <Link to={company[1]}>
                    <Image src={"/images/companies/" + company[2]} alt={"Logo da companhia " + company[0]} width={75} height={25} className={"object-fit-contain rounded-1"}/>
                  </Link>
                </OverlayTrigger>
              ))
            }
          </div>
        </hgroup>
        <div className="input-group">
          <Form.Control type="search" id={`input-search`} placeholder={inputPlaceholder} className="fs-5" value={search} onChange={(e) => setSearch(e.target.value)} autoComplete={"off"} autoFocus={focus || false}/>
          <Button variant="default" className={"border text-body-tertiary px-3"} type="submit" aria-hidden="true"><i className="bi bi-search"></i></Button>
        </div>
      </FormGroup>
      <SearchLinks/>
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
