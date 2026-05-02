import Util from "../../lib/Util.jsx";
import Alert from "../ui/alert/alert.jsx";
import PropTypes from "prop-types";
import {useRef} from "react";

export default function ShowHolidayInfo({scope}) {
  const data = useRef(Util.getTodayHolidayData(scope))
  const vacation = useRef(Util.getTodayVacationData())
  
  // Error: Cannot access refs during render
  if (data?.["current"]) {
    return (
      <Alert variant={"warning"} dismissible margin={"m-0"}>
        <div className={"d-flex flex-column gap-1"}>
          <p className={"m-0"}>Feriado: hoje é {(data?.["current"]?.["name"])}! As linhas operam no horário de domingo e feriado.</p>
        </div>
      </Alert>
    )
  }

  // Error: Cannot access refs during render
  if (vacation?.["current"]) {
    return (
      <Alert variant={"info"} dismissible margin={"m-0"}>
        <div className={"d-flex flex-column gap-1"}>
          <p className={"m-0"}>Período de {vacation?.["current"]?.["name"]}! Verifique se a linha possui horários específicos para este período.</p>
        </div>
      </Alert>
    )
  }
  
  return <></>
}

ShowHolidayInfo.propTypes = {
  scope: PropTypes.number.isRequired
}
