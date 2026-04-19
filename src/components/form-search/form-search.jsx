import '@/components/form-search/form-search.css';

import {useState} from "react";
import PropTypes from "prop-types";
import {FormGroup} from "react-bootstrap";

import {useSearchHistory} from "@/components/form-search/use-search-history.js";
import Title from "@/components/ui/title/title.jsx";
import SearchLinks from "@/components/search/search-links.jsx";
import FeaturedCompanies from "@/components/form-search/featured-companies.jsx";
import SearchInput from "@/components/form-search/search-input.jsx";

const FormSearch = (
  {
    formTitle,
    inputPlaceholder,
    fnSetIsValidSearch,
    fnSetTermSearch,
    initialValue = ""
  }) => {
  
  const [search, setSearch] = useState(initialValue || '');
  const [feedback, setFeedback] = useState('');
  const {searchHistory, addSearchTerm} = useSearchHistory();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fnSetIsValidSearch(false);
    fnSetTermSearch(null);
    
    setTimeout(() => {
      if (search.trim().length === 0) {
        setFeedback('O campo de pesquisa não pode estar vazio.');
        fnSetIsValidSearch(false);
      } else {
        setFeedback("");
        fnSetIsValidSearch(true);
        fnSetTermSearch(search);
        addSearchTerm(search);
      }
    }, 0);
  };
  
  const handleSelectedItemChange = (item) => {
    const term = item ? item.name : '';
    setSearch(term);
    if (term) {
      fnSetIsValidSearch(true);
      fnSetTermSearch(term);
      addSearchTerm(term);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <hgroup className="d-flex align-items-center justify-content-between flex-wrap flex-column flex-md-row mb-1">
          <Title classX="text-body-secondary m-0 p-0">
            <span className="fs-3 fw-semibold" style={{fontFamily: "inherit"}}>{formTitle}</span>
          </Title>
          <FeaturedCompanies/>
        </hgroup>
        
        <SearchInput
          searchHistory={searchHistory}
          onSelectedItemChange={handleSelectedItemChange}
          onInputValueChange={setSearch}
          placeholder={inputPlaceholder}
          initialValue={search}
        />
      </FormGroup>
      
      <SearchLinks/>
      {feedback && <span className="d-block mt-2 text-danger">{feedback}</span>}
    </form>
  );
};

FormSearch.propTypes = {
  formTitle: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  fnSetIsValidSearch: PropTypes.func.isRequired,
  fnSetTermSearch: PropTypes.func.isRequired,
  initialValue: PropTypes.string
};

export default FormSearch;
