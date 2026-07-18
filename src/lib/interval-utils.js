import moment from "moment";
import {dateConfigs} from "../assets/resources.js";

moment.locale(dateConfigs.lang);

export function compareIntervals(array) {
  let nsarray = [...array].map((item) => {
    return {...item, "departure_time": moment(`2020-01-01T${item.departure_time}-03:00`)};
  });
  
  let accDiff = 0;
  let diffs = [];
  
  // Obtém a média de intervalos e a frequência de repetição de intervalos
  nsarray.forEach((item, index, self) => {
    if (index !== 0) {
      const diff = item?.["departure_time"].diff(self[index - 1]?.["departure_time"], "minutes");
      diffs.push([diff, 0])
      diffs[diffs.findIndex(d => d[0] === diff)][1] = diffs.filter(d => d[0] === diff).length;
      accDiff += diff;
    }
  });
  
  // Remove itens duplicados de diffs
  diffs = diffs
    .toSorted((a, b) => b[1] - a[1])
    .toReversed();
  
  const intervalSorted = diffs.toSorted((a, b) => b[0] - a[0]).toSorted((a, b) => b[0] - a[0]);
  
  const [
    avgIntervals,
    frequencyOccurrenceInterval,
    maxInterval,
    minInterval,
  ] = [
    (accDiff / (nsarray.length - 1)),
    diffs.length > 0 ? [...diffs].pop() : [avgIntervals, 0],
    diffs.length > 0 ? intervalSorted?.[0][0] ?? 0 : 0,
    diffs.length > 0 ? intervalSorted?.toReversed()?.[0][0] ?? 0 : 0,
  ];
  
  return {
    "avgIntervals": avgIntervals,
    "frequencyOccurrenceInterval": frequencyOccurrenceInterval,
    "details": {
      "diffs": [...diffs],
      "maxInterval": maxInterval,
      "minInterval": minInterval
    },
  }
}

export function formatFriendlyDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const fixed = 0;
  
  const zeroInLFT = (number) => (number < 10 ? "0" : "");
  
  if (hours > 0 && remainingMinutes > 0) return `${hours.toFixed(fixed)}h ${zeroInLFT(remainingMinutes)}${remainingMinutes.toFixed(fixed)}m`;
  if (hours > 0) return `${hours.toFixed(fixed)}h`;
  return `${zeroInLFT(minutes)}${minutes.toFixed(fixed)} min`;
}
