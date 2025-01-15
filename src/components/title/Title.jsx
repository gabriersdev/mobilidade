import PropTypes from "prop-types";
import "./title.css";

const Title = ({ type = "h1", id, title, color = "#000", classX = "", children }) => {
  return React.createElement(type, { id: id, className: `title-${type}` + classX, style: { color: color }, title: title ? title.replace(/->/g, 'para') : "" }, title || children)
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
