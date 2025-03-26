import PropTypes from "prop-types";

import './lineInfo.css'

const LineInfo = ({ label, icon, children }) => {
  return (
    <div className="d-flex align-items-center gap-1 flex-wrap">
      <span className="boostrap-icons">{icon || children}</span>
      {['Tarifa', 'Companhia'].includes(label.ref) ? <span className={`line-clamp-1 ${label.ref === 'Tarifa' ? 'naval-blue' : 'green-sheets'}`}>{label.ref}:</span> : ''}
      {label.value ? (<span className={"text-body line-clamp-1"}>{label.value}</span>) : ""}
    </div>
  )
}

LineInfo.propTypes = {
  label: PropTypes.shape({
    ref: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  icon: PropTypes.node,
  children: PropTypes.node
}

export default LineInfo;
