import {Badge, Button, FormControl, InputGroup} from 'react-bootstrap';
import PropTypes from 'prop-types';

import {quickSearchLinks} from "@/assets/resources.js";

const QUICK_SEARCH_TERMS = [...quickSearchLinks].sort();

const GuideSearch = ({term, setTerm, message}) => (
  <form className="mb-5" onSubmit={(e) => e.preventDefault()}>
    <InputGroup>
      <FormControl
        type="text"
        placeholder="Pesquise por um endereço ou local"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <Button variant="default" className="border text-body-tertiary px-3" type="reset" onClick={() => setTerm("")}>
        <i className="bi bi-x-lg"></i>
      </Button>
      <Button variant="default" className="border text-body-tertiary px-3" type="submit">
        <i className="bi bi-search"></i>
      </Button>
    </InputGroup>
    {message && <span className="text-danger d-block mt-1">{message}</span>}
    <div className="py-3 d-flex align-items-center gap-1 overflow-x-scroll">
      {QUICK_SEARCH_TERMS.map((item) => (
        <div key={item} className="cursor-pointer" onClick={() => setTerm(item)}>
          <Badge className="rounded-pill d-inline-block inter fs-6 bg-primary-subtle text-primary-emphasis">
            {item}
          </Badge>
        </div>
      ))}
    </div>
  </form>
);

GuideSearch.propTypes = {
  term: PropTypes.string.isRequired,
  setTerm: PropTypes.func.isRequired,
  message: PropTypes.string,
};

export default GuideSearch;
