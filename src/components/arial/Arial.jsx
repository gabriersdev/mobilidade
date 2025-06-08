import PropTypes from "prop-types";

const Arial = ({children}) => {
  return <span className={"arial"} style={{fontSize: "inherit"}}>{children}</span>;
}

Arial.propTypes = {children: PropTypes.node};

export default Arial;
