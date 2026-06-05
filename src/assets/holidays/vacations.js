import moment from "moment";

export const vacations = [
  {name: "Férias Escolares", start: {month: 12, day: 22}, end: {month: 2, day: 2}},
  {name: "Férias de Julho", start: {month: 7, day: 15}, end: {month: 7, day: 31}}
];

export function getVacation(date) {
  const m = moment(date);
  const year = m.year();
  
  return vacations.find(v => {
    let start = moment(`${year}-${("0" + v.start.month).slice(-2)}-${("0" + v.start.day).slice(-2)}T00:00:00-03:00`);
    let end = moment(`${year}-${("0" + v.end.month).slice(-2)}-${("0" + v.end.day).slice(-2)}T00:00:00-03:00`);
    
    if (start.isAfter(end)) {
      if (m.month() < 6) {
        start.subtract(1, 'year');
      } else {
        end.add(1, 'year');
      }
    }
    
    return m.isBetween(start, end, 'day', '[]');
  });
}
