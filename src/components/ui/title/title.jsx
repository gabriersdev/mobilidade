import PropTypes from "prop-types";
import "@/components/ui/title/title.css";
import Util from "@/lib/Util.jsx";

const Title = ({ type: Component = "h1", id, title, color = "#000", classX = "", children }) => {
  const content = title || children;
  const titleAttr = title ? String(title).replace(/->|⇄/g, 'para') : "";

  const baseClasses = {
    h1: "fs-2",
    h2: "fs-3",
    h3: "fs-3",
  };

  const baseClass = baseClasses[Component] || "";

  return (
    <Component
      id={id}
      className={`title-${Component} fw-medium ${baseClass} ${classX}`.trim()}
      style={{ color }}
      title={titleAttr}
    >
      {typeof content === "string" ? Util.renderText(content) : content}
    </Component>
  );
};

Title.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  color: PropTypes.string,
  classX: PropTypes.string,
  children: PropTypes.node
};

export default Title;
