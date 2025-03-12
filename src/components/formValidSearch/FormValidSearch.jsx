import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import FormSearch from "../formSearch/FormSearch.jsx";

const FormValidSearch = ({formTitle, inputPlaceholder}) => {
  const [isValidSearch, setIsValidSearch] = useState(false);
  const [termSearch, setTermSearch] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isValidSearch && termSearch) {
      navigate(`/search/?term=${termSearch}`)
    }
  }, [isValidSearch, termSearch]);

  return (
    <FormSearch formTitle={formTitle} inputPlaceholder={inputPlaceholder}
                fnSetIsValidSearch={setIsValidSearch} fnSetTermSearch={setTermSearch}/>
  )
}

FormValidSearch.propTypes = {
  formTitle: String.isRequired,
  inputPlaceholder: String.isRequired,
}

export default FormValidSearch;
