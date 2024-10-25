import React from "react";
import PropTypes from "prop-types";
import "./titles.css";

const Title = ({ type, title, color }) => {
  return React.createElement(type, { class: `title-${type}`, style: `color: ${color}` }, title)
}

Title.defaultProps = {
  type: "h1",
  title: "Title",
  color: "#000"
}

Title.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string
}

export default Title;
