import FloatInfo from "@/components/floating-info/float-info.jsx";
import PropTypes from "prop-types";

export default function LineFloatingInfo({line}) {
  if (!line) return null;
  return <FloatInfo string={line["line_name"]?.replace(/\//, " ")}/>
}

LineFloatingInfo.propTypes = {
  line: PropTypes.shape({
    line_name: PropTypes.string.isRequired
  })
}
