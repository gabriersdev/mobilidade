import React from "react";
import PropTypes from "prop-types";

import './lineInfo.css'

const LineInfo = ({label, icon, children}) => {
  return (
    <div className="d-flex align-items-center gap-1">
      <span className="boostrap-icons">{icon || children}</span>
      {['Tarifa', 'Concessionária'].includes(label.ref) ?
        <span className={label.ref === 'Tarifa' ? 'naval-blue' : 'green-sheets'}>{label.ref}:</span> : ''}
      <span>{label.value}</span>
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
