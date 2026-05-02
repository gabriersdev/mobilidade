import { useState, useEffect } from 'react';
import moment from 'moment';

export function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return currentTime;
}
