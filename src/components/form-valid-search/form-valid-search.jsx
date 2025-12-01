import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import FormSearch from "../form-search/form-search";
import PropTypes from "prop-types";

const FormValidSearch = ({formTitle, inputPlaceholder, focus}) => {
  const [isValidSearch, setIsValidSearch] = useState(false);
  const [termSearch, setTermSearch] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isValidSearch && termSearch) {
      navigate(`/search/?term=${termSearch}`)
    }
  }, [isValidSearch, termSearch]);

  return (
    <FormSearch formTitle={formTitle} inputPlaceholder={inputPlaceholder} fnSetIsValidSearch={setIsValidSearch} fnSetTermSearch={setTermSearch} focus={focus}/>
  )
}

FormValidSearch.propTypes = {
  formTitle: PropTypes.string.isRequired,
  inputPlaceholder: PropTypes.string.isRequired,
  focus: PropTypes.bool,
}

export default FormValidSearch;
