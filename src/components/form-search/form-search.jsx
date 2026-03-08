import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {FormGroup, Button, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import Title from "../ui/title/title.jsx";
import SearchLinks from "../search/search-links.jsx";
import GenericCombobox from "@/components/ui/combo-box/combo-box.jsx";
import './form-search.css';

const FEATURED_COMPANIES = [
  { name: "Vinscol", path: "/company/3", logo: "vinscol.svg" },
  { name: "Transporte Coletivo Metropolitano - MG", path: "/company/4", logo: "der-mg.png" },
];

const FormSearch = ({formTitle, inputPlaceholder, fnSetIsValidSearch, fnSetTermSearch, initialValue = ""}) => {
  const [search, setSearch] = useState(initialValue || '');
  const [feedback, setFeedback] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(history.map(term => ({name: term})));
  }, []);

  const handleSearchHistory = (term) => {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!history.includes(term)) {
      history.push(term);
      localStorage.setItem('searchHistory', JSON.stringify(history));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fnSetIsValidSearch(false);
    fnSetTermSearch(null);

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
        handleSearchHistory(search);
      }
    }, 0)
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <hgroup className={"d-flex align-items-center justify-content-between flex-wrap flex-column flex-md-row mb-1"}>
          <Title classX=" text-body-secondary m-0 p-0">
            <span className={"fs-3 fw-semibold"} style={{fontFamily: "inherit"}}>{formTitle}</span>
          </Title>
          <div className={"d-flex align-items-center flex-wrap gap-1 justify-content-center"}>
            {FEATURED_COMPANIES.map((company) => (
              <OverlayTrigger key={company.path} overlay={<Tooltip><p className={"m-0 p-0 line-clamp-2"}>Veja as linhas ativas da companhia {company.name}</p></Tooltip>}>
                <Link to={company.path}>
                  <Image src={`/images/companies/${company.logo}`} alt={`Logo da companhia ${company.name}`} width={75} height={25} className={"object-fit-contain rounded-1"}/>
                </Link>
              </OverlayTrigger>
            ))}
          </div>
        </hgroup>
        <div className="input-group d-flex flex-wrap align-items-center mt-2">
          <GenericCombobox
            items={searchHistory}
            itemToString={(item) => (item ? item.name : '')}
            onSelectedItemChange={(item) => {
              const term = item ? item.name : '';
              setSearch(term);
              if (term) {
                fnSetIsValidSearch(true);
                fnSetTermSearch(term);
                handleSearchHistory(term);
              }
            }}
            onInputValueChange={(inputValue) => setSearch(inputValue)}
            placeholder={inputPlaceholder}
            label={""}
            required={true}
          />
          <Button variant="default" className={"border text-body-tertiary"} type="submit" aria-hidden="true"><i className="bi bi-search"></i></Button>
        </div>
      </FormGroup>
      <SearchLinks/>
      {feedback && <span className={"d-block mt-2 text-danger"}>{feedback}</span>}
    </form>
  )
}

FormSearch.propTypes = {
  formTitle: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  fnSetIsValidSearch: PropTypes.func.isRequired,
  fnSetTermSearch: PropTypes.func.isRequired,
  initialValue: PropTypes.string
}

export default FormSearch;
