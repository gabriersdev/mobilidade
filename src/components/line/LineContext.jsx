import PropTypes from "prop-types";
import {createContext, useState} from "react";

const Context = createContext({});
  
const LineContext = ({children}) => {
  const [firstPointByDirection, setFirstPointByDirection] = useState({});
  
  return (
    <Context.Provider value={Object.assign({}, {firstPointByDirection, setFirstPointByDirection})}>
      {children}
    </Context.Provider>
  )
}

LineContext.propTypes = {
  children: PropTypes.node.isRequired,
}

export {Context, LineContext};