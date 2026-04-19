// Custom hook for the clock
import {useEffect, useState} from "react";
import moment from "moment";
import {dateConfigs} from "@/assets/resources.js";

moment.locale(dateConfigs.lang);

const useClock = () => {
  const [time, setTime] = useState(moment());
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(moment());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return time;
};

export default useClock;
