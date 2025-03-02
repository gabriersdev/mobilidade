import PropTypes from "prop-types";

import Title from "../title/Title";
import LineInfo from "../lineInfo/LineInfo";
import {Link} from "react-router-dom";

const LineIdentification = ({ line }) => {
  let [lineType, scope, hasIntegration, fare] = ['', '', ''];

  switch (line.type) {
    case 1:
      lineType = "Coletivo Urbano";
      break
    case 2:
      lineType = "Executivo Urbano";
      break
    case 3:
      lineType = "Executivo Rodoviário";
      break
    case 4:
      lineType = "Coletivo Rodoviário";
      break
    default:
      lineType = "Não informado";
  }

  switch (line.scope) {
    case 1:
      scope = "Municipal";
      break
    case 2:
      scope = "Metropolitano";
      break
    case 3:
      scope = "Rodoviário";
      break
    case 4:
      scope = "Intermunicipal";
      break
    default:
      scope = "Não informado";
  }

  if (line.has_integration === 1) hasIntegration = "Possui integração";
  else hasIntegration = "Não possui integração";

  if (parseFloat(line.fare) === 0) {
    fare = "Não informado";
  } else {
    fare = Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(line.fare);
  }

  return (
    <div className="d-flex flex-column gap-3">
      <hgroup className="d-flex align-items-center gap-2 flex-wrap mb-0">
        <Title type="h2" classX=" fs-2 d-inline text-body-emphasis m-0 p-0">Linha {line.line_number}</Title>
        <span className="text-body-secondary">|</span>
        <Title type="h2" classX=" fs-2 d-inline text-body-secondary m-0 p-0">{line.departure_location} -{">"} {line.destination_location}</Title>
      </hgroup>
      <span className={"d-block mb-5 text-body-secondary"}>{line.line_name.replace(/\//, " -> ") || ""}</span>
      <div>
        <div className="d-flex align-items-center gap-3 flex-wrap mb-3">
          <LineInfo label={{ ref: 'Tipo da Linha', value: lineType }}>
            <i className="bi bi-record-circle red"></i>
          </LineInfo>
          <LineInfo label={{ ref: 'Grupo de atendimento', value: scope }}>
            <i className="bi bi-building red"></i>
          </LineInfo>
          <LineInfo label={{ ref: 'Integração com outras Linhas ou Modais', value: hasIntegration }}>
            <i className="bi bi-train-front-fill purple"></i>
          </LineInfo>
        </div>
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <LineInfo label={{ ref: 'Tarifa', value: fare }}>
            <i className="bi bi-cash-coin naval-blue"></i>
          </LineInfo>
          <Link to={`/company/${line.company_id}`} className={"text-decoration-none"}>
            <LineInfo label={{ ref: 'Companhia', value: line.company_name }}>
              <i className="bi bi-buildings green-sheets"></i>
            </LineInfo>
          </Link>
        </div>
      </div>
    </div >
  )
}

LineIdentification.propTypes = {
  line: PropTypes.shape({
    line_number: PropTypes.string.isRequired,
    line_name: PropTypes.string.isRequired,
    departure_location: PropTypes.string.isRequired,
    destination_location: PropTypes.string.isRequired,
    company_name: PropTypes.string.isRequired,
    company_id: PropTypes.number.isRequired,
    fare: PropTypes.string.isRequired,
    has_integration: PropTypes.number.isRequired,
    scope: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
  }).isRequired
}

export default LineIdentification;
