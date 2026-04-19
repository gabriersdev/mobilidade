import {useEffect, useState} from 'react';
import moment from 'moment';
import {dateConfigs} from "@/assets/resources";

moment.locale(dateConfigs.lang);

export const useClock = () => {
  const [time, setTime] = useState(moment());
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(moment());
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return time;
};
