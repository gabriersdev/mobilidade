import {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import config from "../../assets/config.js";

export const useLineWarnings = (line_id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleWarningIds, setVisibleWarningIds] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${config.host}/api/line_warnings/`, {line_id: line_id});
        const responseWithId = response.data.map((d, i) => ({...d, id: i}));
        setData(responseWithId);
        setVisibleWarningIds(responseWithId.map(warning => warning.id));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData().then();
  }, [line_id]);
  
  const getValidWarnings = (warnings) => {
    return warnings.filter(warning => {
      const now = new Date();
      const mNow = moment();
      const timeNow = new Date(`${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
      const frequency = parseInt(warning.frequency, 10);
      const timeInit = new Date(`${new Date().getFullYear()} ${warning?.["time_init"]}`);
      const timeFinish = new Date(`${new Date().getFullYear()} ${warning?.["time_finish"]}`);
      const dayInit = parseInt(warning?.["day_init"], 10);
      const dayFinish = parseInt(warning?.["day_finish"], 10);
      const dateInit = new Date(`${new Date().getFullYear()} ${warning?.["date_init"]}`);
      const dateFinish = new Date(`${new Date().getFullYear()} ${warning?.["date_finish"]}`);
      const datetimeInit = new Date(warning?.["datetime_init"]);
      const datetimeFinish = new Date(warning?.["datetime_finish"]);
      
      const createDateTimeToHours = (content) => {
        const datetime = new Date(content);
        return moment(`${moment().format("YYYY-MM-DD")}T${('0' + datetime.getHours()).slice(-2)}:${('0' + datetime.getMinutes()).slice(-2)}:${('0' + datetime.getSeconds()).slice(-2)}`);
      };
      
      switch (frequency) {
        case 1:
          return now.getTime() >= datetimeInit.getTime() && now.getTime() <= datetimeFinish.getTime();
        case 2:
          return (now.getDay() >= dayInit && now.getDay() <= dayFinish) && (createDateTimeToHours(timeInit).diff(mNow, "seconds") <= 0 && createDateTimeToHours(timeFinish).diff(mNow, "seconds") >= 0);
        case 3:
          return now.getTime() >= dateInit.getTime() && now.getTime() <= dateFinish.getTime();
        case 4:
          return timeNow.getTime() >= timeInit.getTime() && timeNow.getTime() <= timeFinish.getTime();
        default:
          console.error('Frequência inválida:', frequency);
          return false;
      }
    });
  };
  
  const handleDismissWarning = (warningId) => {
    setVisibleWarningIds(prevIds => prevIds.filter(id => id !== warningId));
  };
  
  const warnings = getValidWarnings(data).filter(warning => visibleWarningIds.includes(warning.id));
  
  return {warnings, loading, error, handleDismissWarning};
};
