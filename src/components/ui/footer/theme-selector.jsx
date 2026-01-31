import {DropdownButton, DropdownItem} from "react-bootstrap";
import PropTypes from "prop-types";

const ThemeSelector = ({theme, onThemeChange}) => {
  return (
    <DropdownButton id="dropdown-basic-button" title="Tema" variant="secondary" className="mt-1 rounded-circle">
      <DropdownItem active={["default", "light"].includes(theme)} onClick={() => onThemeChange("light")}>
        Claro
      </DropdownItem>
      <DropdownItem active={theme === "dark"} onClick={() => onThemeChange("dark")}>
        Escuro
      </DropdownItem>
    </DropdownButton>
  );
};

ThemeSelector.propTypes = {
  theme: PropTypes.string.isRequired,
  onThemeChange: PropTypes.func.isRequired,
};

export default ThemeSelector;
