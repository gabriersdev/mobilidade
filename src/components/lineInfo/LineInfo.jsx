import React from "react";
import PropTypes from "prop-types";

import './lineInfo.css'

const LineInfo = ({ label }, icon) => {
  return (
    <div className="d-flex align-items-center gap-1">
      <span className="boostrap-icons">{icon}</span>
      {['Tarifa', 'Concessionária'].includes(label.ref) ? <span className={label.ref === 'Tarifa' ? 'naval-blue' : 'green-sheets'}>{label.ref}:</span> : ''}
      <span>{label.value}</span>
    </div>
  )
}

LineInfo.propTypes = {
  label: {
    ref: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  },
  icon: PropTypes.node.isRequired
}

export default LineInfo;
