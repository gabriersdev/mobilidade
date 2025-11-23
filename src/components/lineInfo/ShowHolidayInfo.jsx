import Util from "../../assets/Util.jsx";
import Alert from "../alert/Alert.jsx";
import PropTypes from "prop-types";
import {useRef} from "react";

export default function ShowHolidayInfo({scope}) {
  const data = useRef(Util.getTodayHolidayData(scope))
  
  if (data?.["current"]) {
    return (
      <Alert variant={"warning"} dismissible>
        <div className={"d-flex flex-column gap-1"}>
          <p className={"m-0"}>Feriado: hoje é {(data?.["current"]?.["name"])}!</p>
          <p className={"m-0 text-sml"}>As linhas operam no horário de domingo e feriado.</p>
        </div>
      </Alert>
    )
  }
  
  return <></>
}

ShowHolidayInfo.propTypes = {
  scope: PropTypes.number.isRequired
}
