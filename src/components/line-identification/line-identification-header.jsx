import PropTypes from "prop-types";
import Title from "../ui/title/title.jsx";
import LineIdentificationCompanyLogo from "./line-identification-company-logo.jsx";

const LineIdentificationHeader = ({line}) => {
  return (
    <div className={"d-flex align-items-start flex-wrap gap-3 justify-content-between flex-column flex-column-reverse flex-lg-row"}>
      <div>
        <hgroup className="d-flex align-items-center gap-2 flex-wrap mb-0">
          <h1 className={"d-none"}>Linha {line.line_number} - {line.departure_location} para {line.destination_location}</h1>
          <Title type="h2" classX=" fs-2 d-inline text-body-emphasis m-0 p-0">Linha {line.line_number}</Title>
          <span className="text-body-secondary">|</span>
          <Title type="h2" classX=" fs-2 d-inline text-body-secondary m-0 p-0 lh-sm">{line.departure_location} ⇄ {line.destination_location}</Title>
        </hgroup>
        {
          line.line_name.toLowerCase() !== line.departure_location.toLowerCase() + "/" + line.destination_location.toLowerCase() ? (
            <span className={"d-block mb-lg-5 mt-3 mt-md-2 text-body-secondary"}>{line.line_name.replace(/\//, " ⇄ ") || ""}</span>
          ) : (
            <div className={"my-lg-2"}></div>
          )
        }
      </div>

      <LineIdentificationCompanyLogo companyId={line.company_id}/>
    </div>
  );
};

LineIdentificationHeader.propTypes = {
  line: PropTypes.object.isRequired
}


export default LineIdentificationHeader;
