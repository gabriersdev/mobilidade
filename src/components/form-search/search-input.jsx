import PropTypes from 'prop-types';
import {Button} from "react-bootstrap";
import GenericCombobox from "@/components/ui/combo-box/combo-box.jsx";

const SearchInput = ({
  searchHistory,
  onSelectedItemChange,
  onInputValueChange,
  placeholder,
  initialValue
}) => (
  <>
    <div className="input-group d-flex align-items-center mt-2">
      <GenericCombobox
        items={searchHistory}
        itemToString={(item) => (item ? item.name : '')}
        onSelectedItemChange={onSelectedItemChange}
        onInputValueChange={onInputValueChange}
        placeholder={placeholder}
        initialValue={initialValue}
        label={""}
        subLabel={"Pesquisas recentes"}
        required={true}
      />
      <Button variant="default" className="border text-body-tertiary d-none d-md-block" type="submit" aria-hidden="true">
        <i className="bi bi-search"></i>
      </Button>
    </div>
    <Button variant="secondary" className="mt-2 w-100 rounded-0 d-md-none" type="submit" aria-hidden="true">
      <i className="bi bi-search"></i>
    </Button>
  </>
);

SearchInput.propTypes = {
  searchHistory: PropTypes.array.isRequired,
  onSelectedItemChange: PropTypes.func.isRequired,
  onInputValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  initialValue: PropTypes.string,
};

export default SearchInput;
