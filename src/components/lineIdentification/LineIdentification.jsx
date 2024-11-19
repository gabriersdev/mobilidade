import React from "react";
import PropTypes from "prop-types";

import Title from "../title/Title";
import LineInfo from "../lineInfo/LineInfo";

const LineIdentification = ({ line }) => {
  return (
    <div className="d-flex flex-column gap-3">
      <hgroup className="d-flex align-items-center gap-2 flex-wrap">
        <Title type="h2" classX="d-inline">Linha {line.number}</Title>
        <span style={{ color: '#4C4C4C', fontSize: '20px' }} className="mb-1">|</span>
        <Title type="h2" classX="d-inline" color="#4C4C4C">{line.start} -{">"} {line.finish}</Title>
      </hgroup>
      <div>
        <div className="d-flex align-items-center gap-3 flex-wrap mb-3">
          <LineInfo label={{ ref: 'Tipo da Linha', value: 'Coletivo' }}>
            <i className="bi bi-record-circle red"></i>
          </LineInfo>
          <LineInfo label={{ ref: 'Grupo de atendimento', value: 'Intermunicipal' }}>
            <i className="bi bi-building red"></i>
          </LineInfo>
          <LineInfo label={{ ref: 'Integração com outras Linhas ou Modais', value: 'Possui integração' }}>
            <i className="bi bi-train-front-fill purple"></i>
          </LineInfo>
        </div>
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <LineInfo label={{ ref: 'Tarifa', value: '5.70' }}>
            <i className="bi bi-cash-coin naval-blue"></i>
          </LineInfo>
          <LineInfo label={{ ref: 'Concessionária', value: 'Via Brasil' }}>
            <i className="bi bi-handbag green-sheets"></i>
          </LineInfo>
        </div>
      </div>
    </div >
  )
}

LineIdentification.propTypes = {
  line: PropTypes.shape({
    number: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    finish: PropTypes.string.isRequired
  }).isRequired
}

export default LineIdentification;
