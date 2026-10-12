import Util from "../../lib/Util.jsx";
import Alert from "../ui/alert/alert.jsx";
import PropTypes from "prop-types";

export default function ShowHolidayInfo({line, scope}) {
  const lineTarget = line || scope;
  const data = Util.getTodayHolidayData(lineTarget);
  const vacation = Util.getTodayVacationData();
  
  if (data) {
    const targetSchedule = data.scheduleTarget === "sábado"
      ? "sábado"
      : data.scheduleTarget === "dia útil atípico"
        ? "dia útil atípico"
        : "domingo e feriado";

    let message;
    if (data.scope === "municipal") {
      message = (
        <p className={"m-0"}>
          Feriado municipal ({data.city || "local"}): hoje é {data.name}! As linhas <b>municipais</b> operam no horário de {targetSchedule}.
        </p>
      );
    } else if (data.scope === "metropolitan") {
      message = (
        <p className={"m-0"}>
          Feriado metropolitano: hoje é {data.name}! As linhas <b>metropolitanas</b> operam no horário de {targetSchedule}.
        </p>
      );
    } else if (data.scope === "state") {
      message = (
        <p className={"m-0"}>
          Feriado estadual: hoje é {data.name}! As linhas operam no horário de {targetSchedule}.
        </p>
      );
    } else {
      message = (
        <p className={"m-0"}>
          Feriado nacional: hoje é {data.name}! As linhas operam no horário de {targetSchedule}.
        </p>
      );
    }

    return (
      <Alert variant={"warning"} dismissible margin={"m-0"}>
        <div className={"d-flex flex-column gap-1"}>
          {message}
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
  line: PropTypes.object,
  scope: PropTypes.any
};

