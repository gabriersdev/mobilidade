import React from "react";
import PropTypes from "prop-types";
import "./title.css";

const Title = ({ type = "h1", title = "Title", color = "#000", classX = "" }, children) => {
  return React.createElement(type || children, { className: `title-${type}` + classX, style: { color: color } }, title)
}

Title.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
  color: PropTypes.string,
  classX: PropTypes.string,
  children: PropTypes.node
}

export default Title;
