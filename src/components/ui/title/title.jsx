import {createElement} from "react";
import PropTypes from "prop-types";
import "./title.css";
import Util from "../../../assets/Util.jsx";

const Title = ({type = "h1", id, title, color = "#000", classX = "", children}) => {
  return createElement(type, {id: id, className: `title-${type}` + classX, style: {color: color}, title: title ? title.replace(/->|⇄/g, 'para') : ""}, (typeof title === "string" ? Util.renderText(title) : title) || (typeof children !== "string" ? Util.renderText(children) : children));
}

Title.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  classX: PropTypes.string,
  children: PropTypes.node
}

export default Title;
