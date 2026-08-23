import PropTypes from "prop-types";
import "./floating-info.css";

export default function FloatInfo({string}) {
  return (
    <div className="floating-info overflow-hidden">
      {
        Array.from({length: 15}).map((_, i) => (
          <span key={i} className="floating-info-text">{string}</span>
        ))
      }
    </div>
  )
}

FloatInfo.propTypes = {
  string: PropTypes.string.isRequired
}
