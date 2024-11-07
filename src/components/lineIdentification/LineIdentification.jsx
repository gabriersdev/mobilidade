import React from "react";
import PropTypes from "prop-types";

import Title from "../title/Title";
import LineInfo from "../lineInfo/LineInfo";

const LineIdentification = ({ line }) => {
  return (
    <div className="d-flex flex-column gap-3">
      <hgroup>
        <Title type="h2" classX="d-inline">Linha {line.number}</Title> | <Title type="h3" classX="d-inline">{line.start} -{">"} {line.finish}</Title>
      </hgroup>
      <div>
        <LineInfo label={{ ref: 'Tipo da Linha', value: 'Coletivo' }}>
          <i className="bi bi-record-circle red"></i>
        </LineInfo>
        <LineInfo label={{ ref: 'Grupo de atendimento', value: 'Intermunicipal' }}>
          <i className="bi bi-building red"></i>
        </LineInfo>
        <LineInfo label={{ ref: 'Integração com outras Linhas ou Modais', value: 'Possui integração' }}>
          <i className="bi bi-train-front-fill purple"></i>
        </LineInfo>
        <LineInfo label={{ ref: 'Tarifa', value: '5.70' }}>
          <i className="bi bi-cash-coin naval-blue"></i>
        </LineInfo>
        <LineInfo label={{ ref: 'Concessária', value: 'Via Brasil' }}>
          <i className="bi bi-handbag green-sheets"></i>
        </LineInfo>
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
