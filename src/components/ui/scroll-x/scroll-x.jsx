import PropTypes from "prop-types";

const ScrollX = ({children}) => {
  return <div className={"overflow-x-scroll d-flex scroll-x gap-3 pt-2 pb-3"}>{children}</div>
}

ScrollX.propTypes = {
  children: PropTypes.node,
}

export default ScrollX;
