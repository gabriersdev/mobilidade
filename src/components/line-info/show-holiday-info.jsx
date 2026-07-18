import Util from "../../lib/Util.jsx";
import Alert from "../ui/alert/alert.jsx";
import PropTypes from "prop-types";

export default function ShowHolidayInfo({scope}) {
  const data = Util.getTodayHolidayData(scope);
  const vacation = Util.getTodayVacationData();
  
  if (data) {
    return (
      <Alert variant={"warning"} dismissible margin={"m-0"}>
        <div className={"d-flex flex-column gap-1"}>
          {/*TODO - para o caso em que o feriado for apenas MUNICIPAL*/}
          <div className={"d-none"}><p className={"m-0"}>Feriado: hoje é {data.name}! As linhas {true ? <b>municipais</b> : ""} operam no horário de domingo e feriado.</p></div>
          {/*TODO - para o caso em que o feriado for apenas em B.HTE (linhas metropolitanas)*/}
          <div className={"d-none"}><p className={"m-0"}>Feriado: hoje é {data.name}! As linhas {true ? <b>metropolitanas</b> : ""} operam no horário de sábado.</p></div>
          {/*TODO - para o caso em que o feriado for Nacional ou para o sistema INTEIRO*/}
          <p className={"m-0"}>Feriado: hoje é {data.name}! As linhas operam no horário de domingo e feriado.</p>
        </div>
      </Alert>
    );
  }
  
  if (vacation) {
    return (
      <Alert variant={"info"} dismissible margin={"m-0"}>
        <div className={"d-flex flex-column gap-1"}>
          <p className={"m-0"}>Período de {vacation.name}! Fique atento as mudanças nos quadros de horários e aos avisos aqui.</p>
        </div>
      </Alert>
    );
  }
  
  return null;
}

ShowHolidayInfo.propTypes = {
  scope: PropTypes.number.isRequired
}
