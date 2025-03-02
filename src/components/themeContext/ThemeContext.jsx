import {createContext} from "react";
import PropTypes from "prop-types";

const Theme = createContext({});

function ThemeContext({value, children}) {
  return (
    <Theme.Provider value={value}>
      {children}
    </Theme.Provider>
  );
}

ThemeContext.propTypes = {
  value: PropTypes.object.isRequired,
  children: PropTypes.node
}

export {Theme, ThemeContext};
